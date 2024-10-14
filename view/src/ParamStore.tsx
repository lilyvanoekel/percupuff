import React, { createContext, useState, useContext, useEffect } from "react";
import { debounce } from "./common/debounce";
import { getPatchConnection } from "./common/patchConnection";

/**
 * Manage parameter state/syncing globally.
 */

export interface ParamState {
  mainLevel: number;
}

export type Param = keyof ParamState;

type ParamUpdater = <K extends keyof ParamState>(
  key: K
) => (value: ParamState[K]) => void;

interface ParamStoreContextType {
  state: ParamState;
  setParams: (value: Partial<ParamState>) => void;
  updateParam: ParamUpdater;
}

const initialState: ParamState = {
  mainLevel: 10,
};

type Min = number;
type Max = number;
type Step = number;
export const paramRange: Record<Param, [Min, Max, Step]> = {
  mainLevel: [0, 100, 1],
};

const ParamStoreContext = createContext<ParamStoreContextType | undefined>(
  undefined
);

const paramToDsp = debounce((value: Partial<ParamState>) => {
  const patchConnection = getPatchConnection();

  for (const k in value) {
    const param = k as keyof ParamState;
    patchConnection?.sendEventOrValue(param, value[param]);
    patchConnection?.requestParameterValue(param);
  }
}, 10);

export const ParamStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ParamState>(initialState);

  const setParams = (value: Partial<ParamState>) => {
    paramToDsp(value);
    setState((prevState) => ({ ...prevState, ...value }));
  };

  const updateParam: ParamUpdater = (key) => (value) =>
    setParams({ [key]: value });

  useEffect(() => {
    const patchConnection = getPatchConnection();
    const listener = ({
      endpointID,
      value,
    }: {
      endpointID: Param;
      value: number;
    }) => {
      if (state[endpointID] != value) {
        setState((prevState) => ({ ...prevState, [endpointID]: value }));
      }
    };

    patchConnection?.addAllParameterListener(listener);
    for (const key in initialState) {
      patchConnection?.requestParameterValue(key);
    }
    return () => {
      patchConnection?.removeAllParameterListener(listener);
    };
  }, []);

  return (
    <ParamStoreContext.Provider value={{ state, setParams, updateParam }}>
      {children}
    </ParamStoreContext.Provider>
  );
};

export const useParamStore = (): ParamStoreContextType => {
  const context = useContext(ParamStoreContext);
  if (!context) {
    throw new Error("useParamStore must be used within a StoreProvider");
  }
  return context;
};
