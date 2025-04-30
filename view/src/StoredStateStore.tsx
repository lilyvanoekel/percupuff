/**
 * Extend Cmajor's "stored state" to work with React state
 *
 * @todo: actually link to patchConnection
 */

import React, { createContext, useState, useContext } from "react";
import { InstrumentKey, instrumentKeys } from "./params";

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

export const StoredStatetoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StoredState>(initialState);

  const setStoredState = (value: Partial<StoredState>) => {
    setState((prevState) => ({ ...prevState, ...value }));
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
      "useStoredStateStore must be used within a StoredStatetoreProvider"
    );
  }
  return context;
};
