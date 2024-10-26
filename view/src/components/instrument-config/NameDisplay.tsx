import { HSL } from "../../common/color/hsl";
import { instruments } from "../../params";
import { useStoredStateStore } from "../../StoredStateStore";
import { Button } from "../elements/Button";
import { Label } from "../elements/Label";
import { LetterDisplay } from "../elements/LetterDisplay";

export const NameDisplay = () => {
  const { storedState } = useStoredStateStore();
  return (
    <div>
      <div style={{ marginBottom: "4px" }}>
        <Label>Selected Sound</Label>
      </div>
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={20}
        numberOfLines={1}
        text={[
          instruments[storedState.selectedInstrument].name.toLocaleUpperCase(),
        ]}
        color="green"
        align="right"
      />
      <Button
        width={41}
        height={41}
        style={{ marginLeft: "4px" }}
        glowColor={HSL(0, 100, 100)}
      >
        <svg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="23,28 23,15 15,22"
            fill={HSL(0, 100, 100).toString()}
            style={{ filter: "blur(5px)" }}
          />
          <polygon
            points="23,28 23,15 15,22"
            fill={HSL(0, 100, 100).toString()}
            style={{ filter: "blur(0.5px)" }}
          />
        </svg>
      </Button>
      <Button
        width={41}
        height={41}
        style={{ marginLeft: "4px" }}
        glowColor={HSL(0, 100, 100)}
      >
        <svg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="17,15 17,28 25,21"
            fill={HSL(0, 100, 100).toString()}
            style={{ filter: "blur(5px)" }}
          />
          <polygon
            points="17,15 17,28 25,21"
            fill={HSL(0, 100, 100).toString()}
            style={{ filter: "blur(0.5px)" }}
          />
        </svg>
      </Button>
    </div>
  );
};
