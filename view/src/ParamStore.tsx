/**
 * Manage parameter state/syncing globally.
 */

import React, { createContext, useState, useContext, useEffect } from "react";
import { debounce } from "./common/debounce";
import { getPatchConnection } from "./common/patchConnection";
import {
  endpointIdToParams,
  mapNormalizedValueToParamRange,
  mapParamRangeToNormalizedValue,
  Param,
  paramDefaults,
  ParamState,
  paramToEndpointId,
} from "./params";

type ParamUpdater = <K extends keyof ParamState>(
  key: K,
  value: ParamState[K]
) => void;

interface ParamStoreContextType {
  paramState: ParamState;
  setParams: (value: Partial<ParamState>) => void;
  updateParam: ParamUpdater;
}

const ParamStoreContext = createContext<ParamStoreContextType | undefined>(
  undefined
);

const paramToDsp = debounce((values: Partial<ParamState>) => {
  const patchConnection = getPatchConnection();

  for (const k in values) {
    let param = k as keyof ParamState;
    const endpointId = paramToEndpointId(param);
    const value = values[param];

    if (value === undefined) {
      continue;
    }

    patchConnection?.sendEventOrValue(
      endpointId,
      mapNormalizedValueToParamRange(param, value)
    );
    patchConnection?.requestParameterValue(endpointId);
  }
}, 10);

export const ParamStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ParamState>(paramDefaults);

  const setParams = (value: Partial<ParamState>) => {
    paramToDsp(value);
    setState((prevState) => ({ ...prevState, ...value }));
  };

  const updateParam: ParamUpdater = (key, value) => setParams({ [key]: value });

  useEffect(() => {
    const patchConnection = getPatchConnection();
    const listener = ({
      endpointID,
      value,
    }: {
      endpointID: Param;
      value: number;
    }) => {
      const params = endpointIdToParams(endpointID);
      for (let param of params) {
        const normalizedValue = mapParamRangeToNormalizedValue(param, value);
        if (state[param] != normalizedValue) {
          setState((prevState) => ({
            ...prevState,
            [param]: normalizedValue,
          }));
        }
      }
    };

    patchConnection?.addAllParameterListener(listener);
    for (const param in paramDefaults) {
      const endpointId = paramToEndpointId(param as Param);
      patchConnection?.requestParameterValue(endpointId);
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
