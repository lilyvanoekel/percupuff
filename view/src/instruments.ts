export const instruments = {
  0: ["Acoustic Kick"],
  1: ["Electric Kick"],
  2: ["Acoustic Snare"],
  3: ["Electric Snare"],
  4: ["Closed Hihat"],
  5: ["Pedal Hihat"],
  6: ["Open Hihat"],
} as const;

export type InstrumentId = keyof typeof instruments;
