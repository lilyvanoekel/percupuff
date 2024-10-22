import { HSL } from "../../common/color/hsl";
import { Button } from "../elements/Button";
import { DigitDisplay } from "../elements/DigitDisplay";
import { Label } from "../elements/Label";

export const MidiAssignment: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => (
  <div style={style}>
    <div style={{ marginBottom: "4px" }}>
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
