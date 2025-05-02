import { useEffect, useState } from "react";
import { HSL } from "../../common/color/hsl";
import { instrumentKeyToMidiParam } from "../../params";
import { useParamStore } from "../../ParamStore";
import { useStoredStateStore } from "../../StoredStateStore";
import { Button } from "../elements/Button";
import { DigitDisplay } from "../elements/DigitDisplay";
import { Label } from "../elements/Label";
import { getPatchConnection } from "../../common/patchConnection";
import { playMidiNote } from "../../common/midi";

export const MidiAssignment: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { storedState } = useStoredStateStore();
  const { paramState, updateParam } = useParamStore();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const midiParam = instrumentKeyToMidiParam(storedState.selectedInstrument);
  const midiValue = paramState[midiParam];
  const recordingPulseClass = isRecording ? "pulse-red" : "";
  const recordingPulseClassLight = isRecording ? "pulse-red-light" : "";

  const playingPulseClass = isPlaying ? "pulse-green" : "";
  const playingPulseClassLight = isPlaying ? "pulse-green-light" : "";

  useEffect(() => {
    const patchConnection = getPatchConnection();

    const midiNoteOn = (midiNote: any) => {
      if (isRecording) {
        updateParam(midiParam, midiNote.pitch);
      }
    };

    patchConnection?.addEndpointListener("noteOn", midiNoteOn);
    return () => {
      patchConnection?.removeEndpointListener("noteOn", midiNoteOn);
    };
  });

  const playNote = () => {
    const patchConnection = getPatchConnection();
    playMidiNote(patchConnection, midiValue);
  };

  return (
    <div style={style}>
      <div style={{ marginBottom: "4px" }}>
        <Label>Midi Assignment</Label>
      </div>
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={3}
        number={midiValue}
        color="green"
      />
      <Button
        width={41}
        height={41}
        style={{ marginLeft: "4px" }}
        glowColor={HSL(0, 90, 77)}
        onClick={() => {
          if (isRecording) {
            setIsRecording(false);
          } else {
            setIsRecording(true);
            setIsPlaying(false);
          }
        }}
        pulseClass={recordingPulseClassLight}
      >
        <svg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={recordingPulseClass}
            cx="20"
            cy="21"
            r="5"
            style={{ filter: "blur(5px)", fill: HSL(0, 70, 60).toString() }}
          />
          <circle
            className={recordingPulseClass}
            cx="20"
            cy="21"
            r="5"
            style={{ filter: "blur(0.5px)", fill: HSL(0, 70, 60).toString() }}
          />
        </svg>
      </Button>
      <Button
        width={41}
        height={41}
        style={{ marginLeft: "4px" }}
        glowColor={HSL(120, 90, 77)}
        onClick={() => {
          playNote();
        }}
        pulseClass={playingPulseClassLight}
      >
        <svg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            className={playingPulseClass}
            points="15,15 15,28 27,21"
            fill={HSL(120, 70, 50).toString()}
            style={{ filter: "blur(5px)" }}
          />
          <polygon
            className={playingPulseClass}
            points="15,15 15,28 27,21"
            fill={HSL(120, 70, 50).toString()}
            style={{ filter: "blur(0.5px)" }}
          />
        </svg>
      </Button>
    </div>
  );
};
