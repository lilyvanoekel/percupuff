import { HSL } from "./common/color/hsl";

export const instruments = {
  kick1: { name: "Acoustic Kick", group: "Kicks" },
  kick2: { name: "Electric Kick", group: "Kicks" },

  snare1: { name: "Acoustic Snare", group: "Snares" },
  snare2: { name: "Electric Snare", group: "Snares" },
  clap1: { name: "Clap", group: "Snares" },

  hihat1: { name: "Closed Hihat", group: "Hihats" },
  hihat2: { name: "Pedal Hihat", group: "Hihats" },
  hihat3: { name: "Open Hihat", group: "Hihats" },

  crash1: { name: "Crash Cymbal 1", group: "Crash Cymbals" },
  crash2: { name: "Crash Cymbal 2", group: "Crash Cymbals" },
  crash3: { name: "Crash Cymbal 3", group: "Crash Cymbals" },

  bongo1: { name: "High Bongo", group: "Bongos" },
  bongo2: { name: "Low Bongo", group: "Bongos" },

  claves1: { name: "Claves", group: "Wood Sounds" },
  wood1: { name: "High Wood Block", group: "Wood Sounds" },
  wood2: { name: "Low Wood Block", group: "Wood Sounds" },

  Cowbell: { name: "Cowbell", group: "Cow" },
} as const;

export const instrumentGroups = Array.from(
  new Set(Object.values(instruments).map((instrument) => instrument.group))
);

export type InstrumentGroup = (typeof instrumentGroups)[number];

export const groupColors: Record<InstrumentGroup, HSL> = {
  Kicks: HSL(20, 42, 34),
  Snares: HSL(120, 42, 34),
  Hihats: HSL(180, 42, 34),
  ["Crash Cymbals"]: HSL(180, 42, 34),
  Bongos: HSL(180, 42, 34),
  ["Wood Sounds"]: HSL(180, 42, 34),
  Cow: HSL(180, 42, 34),
};

export type InstrumentKey = keyof typeof instruments;

export type InstrumentParams =
  | `${InstrumentKey}Level`
  | `${InstrumentKey}Panning`
  | `${InstrumentKey}Velocity`;

export interface ParamState extends Record<InstrumentParams, number> {
  mainLevel: number;
  kick1Decay: number;
}

export type Param = keyof ParamState;

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

export const paramDefaults: ParamState = {
  mainLevel: 10,
  kick1Decay: 25,
  ...initialStateInstrumentParams,
};

export const paramRange: Record<Param, [Min, Max, Step]> = {
  mainLevel: [0, 100, 1],
  kick1Decay: [15, 60, 1],
  ...instrumentParamsRange,
};

export const instrumentKeyToLevelParam = <K extends InstrumentKey>(
  key: K
): Param => {
  return `${key}Level`;
};

export const instrumentKeyToPanningParam = <K extends InstrumentKey>(
  key: K
): Param => {
  return `${key}Panning`;
};

export const instrumentKeyToVelocityParam = <K extends InstrumentKey>(
  key: K
): Param => {
  return `${key}Velocity`;
};

type CustomParamName = string[];
export const instrumentToCustomParam: Partial<
  Record<InstrumentKey, [Param, CustomParamName][]>
> = {
  kick1: [["kick1Decay", ["", "DECAY"]]],
};

export const instrumentsByGroup: Record<InstrumentGroup, InstrumentKey[]> =
  Object.keys(instruments).reduce((acc, key) => {
    const group = instruments[key as keyof typeof instruments].group;

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(key as keyof typeof instruments);
    return acc;
  }, {} as Record<string, (keyof typeof instruments)[]>);
