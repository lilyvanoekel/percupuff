import { HSL } from "./common/color/hsl";

export const instruments = {
  kick1: { name: "Acoustic Kick", group: "Kicks", midi: 35 },
  kick2: { name: "Electric Kick", group: "Kicks", midi: 36 },

  snare1: { name: "Acoustic Snare", group: "Snares", midi: 38 },
  snare2: { name: "Electric Snare", group: "Snares", midi: 40 },
  clap1: { name: "Clap", group: "Snares", midi: 39 },

  hihat1: { name: "Closed Hihat", group: "Hihats", midi: 42 },
  hihat2: { name: "Pedal Hihat", group: "Hihats", midi: 44 },
  hihat3: { name: "Open Hihat", group: "Hihats", midi: 46 },

  crash1: { name: "Crash Cymbal 1", group: "Crash Cymbals", midi: 49 },
  crash2: { name: "Crash Cymbal 2", group: "Crash Cymbals", midi: 57 },
  crash3: { name: "Crash Cymbal 3", group: "Crash Cymbals", midi: 52 },

  bongo1: { name: "High Bongo", group: "Bongos", midi: 60 },
  bongo2: { name: "Low Bongo", group: "Bongos", midi: 61 },

  claves1: { name: "Claves", group: "Wood Sounds", midi: 75 },
  wood1: { name: "High Wood Block", group: "Wood Sounds", midi: 76 },
  wood2: { name: "Low Wood Block", group: "Wood Sounds", midi: 77 },

  tom1: { name: "Low Floor Tom", group: "Toms", midi: 41 },
  tom2: { name: "High Floor Tom", group: "Toms", midi: 43 },
  tom3: { name: "Low Tom", group: "Toms", midi: 45 },
  tom4: { name: "Low Mid Tom", group: "Toms", midi: 47 },
  tom5: { name: "High Mid Tom", group: "Toms", midi: 48 },
  tom6: { name: "High Tom", group: "Toms", midi: 50 },

  cowbell: { name: "Cowbell", group: "🐮", midi: 56 },

  rideBell: { name: "Ride Bell", group: "Hihats", midi: 53 },

  // Example of adding an instrument without having it show up in the UI yet.
  sideStick: { name: "Side Stick", group: null, midi: 37 },
} as const;

export const instrumentGroups = Array.from(
  new Set(Object.values(instruments).map((instrument) => instrument.group))
).filter((x) => x != null);

export type InstrumentGroup = (typeof instrumentGroups)[number];

export const groupColors: Record<InstrumentGroup, HSL> = {
  Kicks: HSL(120, 58, 41),
  Snares: HSL(60, 80, 40),
  Hihats: HSL(120, 58, 41),
  ["Crash Cymbals"]: HSL(60, 80, 40),
  Bongos: HSL(60, 80, 40),
  ["Wood Sounds"]: HSL(120, 58, 41),
  Toms: HSL(10, 50, 45),
  ["🐮"]: HSL(60, 80, 40),
};

export type InstrumentKey = keyof typeof instruments;
export const instrumentKeys = Object.keys(instruments) as InstrumentKey[];

// These params apply to each instrument.
export type InstrumentParams =
  | `${InstrumentKey}Level`
  | `${InstrumentKey}Panning`
  | `${InstrumentKey}Velocity`
  | `${InstrumentKey}Midi`;

// Add custom parameters here.
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
    [instrumentKey + "Midi", instruments[instrumentKey as InstrumentKey].midi],
  ])
) as Record<InstrumentParams, number>;

const instrumentParamsRange = Object.fromEntries(
  Object.keys(instruments).flatMap((instrumentKey) => [
    [instrumentKey + "Level", [0, 100, 1]],
    [instrumentKey + "Panning", [-100, 100, 5]],
    [instrumentKey + "Velocity", [0, 100, 1]],
    [instrumentKey + "Midi", [0, 127, 1]],
  ])
) as Record<InstrumentParams, [Min, Max, Step]>;

export const paramDefaults: ParamState = {
  mainLevel: 10,
  kick1Decay: 25,
  ...initialStateInstrumentParams,
} as const;

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

export const instrumentKeyToMidiParam = <K extends InstrumentKey>(
  key: K
): Param => {
  return `${key}Midi`;
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

    if (group === null) {
      return acc;
    }

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(key as keyof typeof instruments);
    return acc;
  }, {} as Record<string, (keyof typeof instruments)[]>);

export const mapNormalizedValueToParamRange = (
  param: Param,
  normalizedValue: number // 0-100
): number => {
  if (param.endsWith("Midi")) {
    return normalizedValue;
  }

  // Clamp the input value to 0-100 range
  const clampedValue = Math.max(0, Math.min(100, normalizedValue));

  // Get the parameter's range definition
  const [min, max] = paramRange[param];

  // Calculate the value in the parameter's range
  return min + (clampedValue / 100) * (max - min);
};

export const mapParamRangeToNormalizedValue = (
  param: Param,
  rawValue: number
): number => {
  if (param.endsWith("Midi")) {
    return rawValue;
  }

  // Get the parameter's range definition
  const [min, max] = paramRange[param];

  // Clamp the input value to the parameter's range
  const clampedValue = Math.max(min, Math.min(max, rawValue));

  // Normalize the value to 0-100 range
  const normalizedValue = ((clampedValue - min) / (max - min)) * 100;

  // Round to 2 decimal places to avoid floating-point precision issues
  return parseFloat(normalizedValue.toFixed(2));
};

// These 2 functions are kind of an ugly hack to group certain parameters together.
// Hihats, for example, are all generated by one sound generator, and do not supports individual levels.
export const paramToEndpointId = (param: Param): string => {
  const match = param.match(
    /^(hihat|bongo|wood|crash)\d+(Level|Panning|Velocity)$/
  );
  if (match) {
    return `${match[1]}${match[2]}`;
  }
  if (param === "claves1Level") {
    return "woodLevel";
  }
  if (param === "claves1Panning") {
    return "woodPanning";
  }
  if (param === "claves1Velocity") {
    return "woodVelocity";
  }
  return param;
};

export const endpointIdToParams = (endpointId: string): Param[] => {
  const paramGroups: Record<string, Param[]> = {
    hihatLevel: ["hihat1Level", "hihat2Level", "hihat3Level"],
    bongoLevel: ["bongo1Level", "bongo2Level"],
    woodLevel: ["claves1Level", "wood1Level", "wood2Level"],
    crashLevel: ["crash1Level", "crash2Level", "crash3Level"],

    hihatPanning: ["hihat1Panning", "hihat2Panning", "hihat3Panning"],
    bongoPanning: ["bongo1Panning", "bongo2Panning"],
    woodPanning: ["claves1Panning", "wood1Panning", "wood2Panning"],
    crashPanning: ["crash1Panning", "crash2Panning", "crash3Panning"],

    hihatVelocity: ["hihat1Velocity", "hihat2Velocity", "hihat3Velocity"],
    bongoVelocity: ["bongo1Velocity", "bongo2Velocity"],
    woodVelocity: ["claves1Velocity", "wood1Velocity", "wood2Velocity"],
    crashVelocity: ["crash1Velocity", "crash2Velocity", "crash3Velocity"],
  };

  return paramGroups[endpointId] ?? [endpointId as Param];
};
