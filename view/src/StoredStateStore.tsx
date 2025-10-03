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
      // Validate value before sending
      if (key === 'selectedInstrument' && value && !instrumentKeys.includes(value as InstrumentKey)) {
        console.warn(`Invalid selectedInstrument value: ${value}, skipping`);
        continue;
      }
      // Future-proof: allow null/undefined to clear
      patchConnection.sendStoredStateValue?.(key, value as any);
    }
  };

  const setStoredState = (value: Partial<StoredState>) => {
    if (!value || Object.keys(value).length === 0) return;

    // Validate incoming values
    const validatedValue: Partial<StoredState> = {};
    for (const k in value) {
      const key = k as keyof StoredState;
      const val = value[key];
      if (key === 'selectedInstrument') {
        if (val && instrumentKeys.includes(val as InstrumentKey)) {
          (validatedValue as any)[key] = val;
        } else {
          console.warn(`Invalid selectedInstrument: ${val}, keeping current value`);
        }
      } else {
        (validatedValue as any)[key] = val;
      }
    }

    setState((prevState) => {
      const next = { ...prevState, ...validatedValue };
      // Send only changed keys
      const changed: Partial<StoredState> = {};
      for (const k in validatedValue) {
        const key = k as keyof StoredState;
        if (prevState[key] !== next[key]) (changed as any)[key] = next[key];
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
    let patchConnection: any;
    try {
      patchConnection = getPatchConnection();
    } catch {
      return;
    }
    if (!patchConnection) return;

    // Listener for individual key updates from patch
    const storedStateListener = ({ key, value }: { key: string; value: any }) => {
      if (!(key in stateRef.current)) return; // ignore keys we don't know yet
      const typedKey = key as keyof StoredState;

      // Validate incoming value
      if (typedKey === 'selectedInstrument') {
        if (!value || !instrumentKeys.includes(value as InstrumentKey)) {
          return;
        }
      }

      if (stateRef.current[typedKey] !== value) {
        setState((prev) => ({ ...prev, [typedKey]: value }));
      }
    };

    try {
      patchConnection.addStoredStateValueListener?.(storedStateListener);
    } catch { }

    // Request full state so we can merge existing values (if any) stored by host
    try {
      patchConnection.requestFullStoredState?.((full: any) => {
        try {
          const values = full?.values || {};
          const incoming: Partial<StoredState> = {};
          for (const k in values) {
            if (k in stateRef.current) {
              const key = k as keyof StoredState;
              const value = values[k];

              // Validate values from patch
              if (key === 'selectedInstrument') {
                if (value && instrumentKeys.includes(value as InstrumentKey)) {
                  (incoming as any)[key] = value;
                }
              } else {
                (incoming as any)[key] = value;
              }
            }
          }
          if (Object.keys(incoming).length) {
            setState((prev) => ({ ...prev, ...incoming }));
          } else {
            // If host has nothing, push our initial state so it becomes persisted
            sendStoredStateDelta(stateRef.current);
          }
        } catch { }
      });
    } catch { }

    // Also request each individual key to trigger callbacks (mirrors ParamStore pattern)
    try {
      for (const key in stateRef.current) {
        patchConnection.requestStoredStateValue?.(key);
      }
    } catch { }

    return () => {
      try {
        patchConnection.removeStoredStateValueListener?.(storedStateListener);
      } catch { }
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
