/**
 * Extend Cmajor's "stored state" to work with React state
 *
 * @todo: actually link to patchConnection
 */

import React, { createContext, useState, useContext } from "react";

const instruments = {
  0: ["Accoustic Kick"],
  1: ["Electric Kick"],
  2: ["Accoustic Snare"],
  3: ["Electric Snare"],
  4: ["Closed Hihat"],
  5: ["Pedal Hihat"],
  6: ["Open Hihat"],
} as const;

export type InstrumentId = keyof typeof instruments;
export interface StoredState {
  selectedInstrument: InstrumentId;
}

export type StoredStateItem = keyof StoredState;

const initialState: StoredState = {
  selectedInstrument: 1,
};

type StoredStateUpdater = <K extends keyof StoredState>(
  key: K
) => (value: StoredState[K]) => void;

interface StoredStateStoreContextType {
  state: StoredState;
  setStoredState: (value: Partial<StoredState>) => void;
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

  return (
    <StoredStateStoreContext.Provider
      value={{ state, setStoredState, updateStoredStateItem }}
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
