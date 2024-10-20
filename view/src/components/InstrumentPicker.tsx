import { HSL } from "../common/color/hsl";
import { InstrumentKey } from "../ParamStore";
import { useStoredStateStore } from "../StoredStateStore";
import { Button2 } from "./elements/Button2";
import { Label } from "./elements/Label";

export const InstrumentGroup: React.FC<{
  name: string;
  instrumentIds: InstrumentKey[];
  hue: number;
}> = ({ name, instrumentIds, hue }) => {
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
              color={HSL(hue, 42, 34)}
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

export const InstrumentPicker: React.FC = () => (
  <div style={{ padding: "10px" }}>
    <InstrumentGroup name="Kicks" instrumentIds={["bd1", "bd2"]} hue={20} />
    {/* <InstrumentGroup name="Snares" instrumentIds={[2, 3]} hue={120} />
    <InstrumentGroup name="Hihats" instrumentIds={[4, 5, 6]} hue={180} /> */}
  </div>
);
