/**
 * Manage parameter state/syncing globally.
 */

import React, { createContext, useState, useContext, useEffect } from "react";
import { debounce } from "./common/debounce";
import { getPatchConnection } from "./common/patchConnection";

export const instruments = {
  bd1: { name: "Acoustic Kick" },
  bd2: { name: "Electric Kick" },
} as const;

export type InstrumentKey = keyof typeof instruments;
type InstrumentParams =
  | `${InstrumentKey}Level`
  | `${InstrumentKey}Panning`
  | `${InstrumentKey}Velocity`;

export interface ParamState extends Record<InstrumentParams, number> {
  mainLevel: number;
  bd1Decay: number;
}

export type Param = keyof ParamState;

type ParamUpdater = <K extends keyof ParamState>(
  key: K
) => (value: ParamState[K]) => void;

interface ParamStoreContextType {
  paramState: ParamState;
  setParams: (value: Partial<ParamState>) => void;
  updateParam: ParamUpdater;
}

type Min = number;
type Max = number;
type Step = number;

const initialStateInstrumentParams = Object.fromEntries(
  Object.keys(instruments).flatMap((instrumentKey) => [
    [instrumentKey + "Level", 50],
    [instrumentKey + "Panning", 0],
    [instrumentKey + "Velocity", 100],
  ])
) as Record<InstrumentParams, number>;

const instrumentParamsRange = Object.fromEntries(
  Object.keys(instruments).flatMap((instrumentKey) => [
    [instrumentKey + "Level", [0, 100, 1]],
    [instrumentKey + "Panning", [-100, 100, 0]],
    [instrumentKey + "Velocity", [0, 100, 1]],
  ])
) as Record<InstrumentParams, [Min, Max, Step]>;

const initialState: ParamState = {
  mainLevel: 10,
  bd1Decay: 25,
  ...initialStateInstrumentParams,
};

export const paramRange: Record<Param, [Min, Max, Step]> = {
  mainLevel: [0, 100, 1],
  bd1Decay: [15, 60, 1],
  ...instrumentParamsRange,
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
    <ParamStoreContext.Provider
      value={{ paramState: state, setParams, updateParam }}
    >
      {children}
    </ParamStoreContext.Provider>
  );
};

export const useParamStore = (): ParamStoreContextType => {
  const context = useContext(ParamStoreContext);
  if (!context) {
    throw new Error("useParamStore must be used within a ParamStoreProvider");
  }
  return context;
};
