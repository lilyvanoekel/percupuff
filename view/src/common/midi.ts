let activeNotes = new Map();

export const playMidiNote = (
  patchConnection: any,
  midiValue: number,
  velocity = 100,
  duration = 100
) => {
  if (activeNotes.has(midiValue)) {
    clearTimeout(activeNotes.get(midiValue).timeout);
  }

  patchConnection?.sendMIDIInputEvent(
    "midiIn",
    0x900000 | (midiValue << 8) | velocity
  );

  const timeout = setTimeout(() => {
    patchConnection?.sendMIDIInputEvent(
      "midiIn",
      0x800000 | (midiValue << 8) | velocity
    );
    activeNotes.delete(midiValue);
  }, duration);

  activeNotes.set(midiValue, { timeout });
};
