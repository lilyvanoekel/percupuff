import { HSL } from "../common/color/hsl";
import {
  groupColors,
  instrumentGroups,
  InstrumentKey,
  instrumentsByGroup,
} from "../params";
import { useStoredStateStore } from "../StoredStateStore";
import { Button2 } from "./elements/Button2";
import { Label } from "./elements/Label";

export const InstrumentGroup: React.FC<{
  name: string;
  instrumentIds: InstrumentKey[];
  color: HSL;
}> = ({ name, instrumentIds, color }) => {
  const { storedState, updateStoredStateItem } = useStoredStateStore();

  return (
    <div style={{ display: "inline-block", marginLeft: "9px" }}>
      <div style={{ textAlign: "center" }}>
        {name === "🐮" ? "🐮" : <Label>{name}</Label>}
      </div>
      <div style={{ display: "flex" }}>
        {instrumentIds.map((id, index) => (
          <div key={id}>
            <Button2
              style={index && !(index % 3) ? { marginLeft: "9px" } : undefined}
              color={color}
              width={47}
              height={63}
              active={storedState.selectedInstrument === id}
              onClick={() => {
                updateStoredStateItem("selectedInstrument")(id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const InstrumentPicker: React.FC = () => {
  return (
    <div style={{ width: "620px" }}>
      {instrumentGroups.map((groupName) => (
        <InstrumentGroup
          key={groupName}
          name={groupName}
          instrumentIds={instrumentsByGroup[groupName]}
          color={groupColors[groupName]}
        />
      ))}
    </div>
  );
};
