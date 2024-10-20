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
    <div style={{ display: "inline-block", marginRight: "10px" }}>
      <div style={{ textAlign: "center" }}>
        <Label>{name}</Label>
      </div>
      <div style={{ display: "flex" }}>
        {instrumentIds.map((id) => (
          <div key={id}>
            <Button2
              color={color}
              width={45}
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
  // instrumentGroup

  return (
    <div style={{ paddingLeft: "10px" }}>
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
