import { HSL } from "../common/color/hsl";
import { instruments } from "../instruments";
import { useStoredStateStore } from "../StoredStateStore";
import { Button } from "./elements/Button";
import { DigitDisplay } from "./elements/DigitDisplay";
import { InlineBlock } from "./elements/InlineBlock";
import { Label } from "./elements/Label";
import { LetterDisplay } from "./elements/LetterDisplay";
import { ParamKnob } from "./elements/ParamKnob";

const NameDisplay = () => {
  const { storedState } = useStoredStateStore();
  return (
    <div>
      <div>
        <Label>Selected Sound</Label>
      </div>
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        // lineLength={9}
        // numberOfLines={2}
        lineLength={18}
        numberOfLines={1}
        text={[
          instruments[storedState.selectedInstrument][0].toLocaleUpperCase(),
        ]}
        // text={instruments[storedState.selectedInstrument][0]
        //   .toLocaleUpperCase()
        //   .split(" ")}
        color="green"
        align="right"
      />
    </div>
  );
};

const MidiAssignment: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => (
  <div style={style}>
    <div>
      <Label>Midi Assignment</Label>
    </div>
    <DigitDisplay
      digitWidth={20}
      digitHeight={30}
      lineLength={3}
      number={120}
      color="green"
    />
    <Button
      width={41}
      height={41}
      style={{ marginLeft: "4px" }}
      glowColor={HSL(0, 90, 77)}
    >
      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="21"
          r="5"
          fill={HSL(0, 70, 60).toString()}
          style={{ filter: "blur(5px)" }}
        />
        <circle
          cx="20"
          cy="21"
          r="5"
          fill={HSL(0, 70, 60).toString()}
          style={{ filter: "blur(0.5px)" }}
        />
      </svg>
    </Button>
    <Button
      width={41}
      height={41}
      style={{ marginLeft: "4px" }}
      glowColor={HSL(120, 90, 77)}
    >
      <svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="15,15 15,28 27,21"
          fill={HSL(120, 70, 50).toString()}
          style={{ filter: "blur(5px)" }}
        />
        <polygon
          points="15,15 15,28 27,21"
          fill={HSL(120, 70, 50).toString()}
          style={{ filter: "blur(0.5px)" }}
        />
      </svg>
    </Button>
  </div>
);

export const InstrumentConfig: React.FC = () => {
  return (
    <div style={{ padding: "10px" }}>
      <InlineBlock>
        <NameDisplay />
      </InlineBlock>
      <InlineBlock style={{ marginLeft: "10px" }}>
        <MidiAssignment />
      </InlineBlock>

      <div>
        <InlineBlock>
          <div style={{ marginTop: "58px" }}>
            <InlineBlock>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "118px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Label>Level</Label>
                </div>
                <ParamKnob param="mainLevel" width={90} height={115.5} />
              </div>
            </InlineBlock>
            {/* </div>
          <div style={{ marginTop: "10px" }}> */}
            <InlineBlock style={{ width: "118px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "118px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Label>Panning</Label>
                </div>
                <ParamKnob param="mainLevel" width={90} height={115.5} />
              </div>
            </InlineBlock>
          </div>
        </InlineBlock>
        <InlineBlock style={{ marginLeft: "10px" }}>
          <Label>Sound Specific Params</Label>
          <div style={{ marginTop: "6px" }}>
            <InlineBlock style={{ marginRight: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <LetterDisplay
                    letterWidth={12}
                    letterHeight={18}
                    lineLength={9}
                    numberOfLines={2}
                    text={["FREQUENCY", "CUTOFF"]}
                    color="green"
                    align="right"
                  />
                </div>
                <div style={{ marginTop: "6px" }}>
                  <ParamKnob param="mainLevel" width={90} height={115.5} />
                </div>
              </div>
            </InlineBlock>
            <InlineBlock style={{ marginRight: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <LetterDisplay
                    letterWidth={12}
                    letterHeight={18}
                    lineLength={9}
                    numberOfLines={2}
                    text={["", "DECAY"]}
                    color="green"
                    align="right"
                  />
                </div>
                <div style={{ marginTop: "6px" }}>
                  <ParamKnob param="mainLevel" width={90} height={115.5} />
                </div>
              </div>
            </InlineBlock>
            <InlineBlock style={{ marginRight: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <LetterDisplay
                    letterWidth={12}
                    letterHeight={18}
                    lineLength={9}
                    numberOfLines={2}
                    text={["", "PITCH"]}
                    color="green"
                    align="right"
                  />
                </div>
                <div style={{ marginTop: "6px" }}>
                  <ParamKnob param="mainLevel" width={90} height={115.5} />
                </div>
              </div>
            </InlineBlock>
          </div>
        </InlineBlock>
      </div>
    </div>
  );
};
