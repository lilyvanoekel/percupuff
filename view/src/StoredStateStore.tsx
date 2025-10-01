/**
 * Extend Cmajor's "stored state" to work with React state
 *
 * @todo: actually link to patchConnection
 */

import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { InstrumentKey, instrumentKeys } from "./params";
import { getPatchConnection } from "./common/patchConnection";
export interface StoredState {
  selectedInstrument: InstrumentKey;
}

export type StoredStateItem = keyof StoredState;

const initialState: StoredState = {
  selectedInstrument: "kick1",
};

type StoredStateUpdater = <K extends keyof StoredState>(
  key: K
) => (value: StoredState[K]) => void;

interface StoredStateStoreContextType {
  storedState: StoredState;
  setStoredState: (value: Partial<StoredState>) => void;
  setPreviousInstrument: () => void;
  setNextInstrument: () => void;
  updateStoredStateItem: StoredStateUpdater;
}

const StoredStateStoreContext = createContext<
  StoredStateStoreContextType | undefined
>(undefined);

export const StoredStateStoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StoredState>(initialState);
  // Keep a ref of last state so we can compare inside effects without stale closures
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Push a delta to the patch connection for each updated key
  const sendStoredStateDelta = (delta: Partial<StoredState>) => {
    const patchConnection = getPatchConnection();
    if (!patchConnection) return;
    for (const k in delta) {
      const key = k as keyof StoredState;
      const value = delta[key];
      // Future-proof: allow null/undefined to clear
      patchConnection.sendStoredStateValue?.(key, value as any);
    }
  };

  const setStoredState = (value: Partial<StoredState>) => {
    if (!value || Object.keys(value).length === 0) return;
    setState((prevState) => {
      const next = { ...prevState, ...value };
      // Send only changed keys
      const changed: Partial<StoredState> = {};
      for (const k in value) {
        const key = k as keyof StoredState;
        if (prevState[key] !== next[key]) changed[key] = next[key];
      }
      if (Object.keys(changed).length) {
        sendStoredStateDelta(changed);
      }
      return next;
    });
  };

  const updateStoredStateItem: StoredStateUpdater = (key) => (value) =>
    setStoredState({ [key]: value });

  const setPreviousInstrument = () => {
    const currentIndex = instrumentKeys.indexOf(state.selectedInstrument);
    const prevIndex =
      (currentIndex - 1 + instrumentKeys.length) % instrumentKeys.length;
    const prevInstrument = instrumentKeys[prevIndex];

    setStoredState({
      selectedInstrument: prevInstrument,
    });
  };

  const setNextInstrument = () => {
    const currentIndex = instrumentKeys.indexOf(state.selectedInstrument);
    const nextIndex = (currentIndex + 1) % instrumentKeys.length;
    const nextInstrument = instrumentKeys[nextIndex];

    setStoredState({
      selectedInstrument: nextInstrument,
    });
  };

  // Initial sync + listener registration
  useEffect(() => {
    const patchConnection = getPatchConnection();
    if (!patchConnection) return; // running in tests or without host

    // Listener for individual key updates from patch
    const storedStateListener = ({ key, value }: { key: string; value: any }) => {
      if (!(key in stateRef.current)) return; // ignore keys we don't know yet
      const typedKey = key as keyof StoredState;
      if (stateRef.current[typedKey] !== value) {
        setState((prev) => ({ ...prev, [typedKey]: value }));
      }
    };

    patchConnection.addStoredStateValueListener?.(storedStateListener);

    // Request full state so we can merge existing values (if any) stored by host
    patchConnection.requestFullStoredState?.((full: any) => {
      try {
        const values = full?.values || {};
        const incoming: Partial<StoredState> = {};
        for (const k in values) {
          if (k in stateRef.current) {
            incoming[k as keyof StoredState] = values[k];
          }
        }
        if (Object.keys(incoming).length) {
          setState((prev) => ({ ...prev, ...incoming }));
        } else {
          // If host has nothing, push our initial state so it becomes persisted
          sendStoredStateDelta(stateRef.current);
        }
      } catch (_e) {
        // noop - fail silently, not critical
      }
    });

    // Also request each individual key to trigger callbacks (mirrors ParamStore pattern)
    for (const key in stateRef.current) {
      patchConnection.requestStoredStateValue?.(key);
    }

    return () => {
      patchConnection.removeStoredStateValueListener?.(storedStateListener);
    };
  }, []);

  return (
    <StoredStateStoreContext.Provider
      value={{
        storedState: state,
        setStoredState,
        setPreviousInstrument,
        setNextInstrument,
        updateStoredStateItem,
      }}
    >
      {children}
    </StoredStateStoreContext.Provider>
  );
};

export const useStoredStateStore = (): StoredStateStoreContextType => {
  const context = useContext(StoredStateStoreContext);
  if (!context) {
    throw new Error(
      "useStoredStateStore must be used within a StoredStateStoreProvider"
    );
  }
  return context;
};
