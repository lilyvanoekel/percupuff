import { instruments } from "../../params";
import { useStoredStateStore } from "../../StoredStateStore";
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
    </div>
  );
};
