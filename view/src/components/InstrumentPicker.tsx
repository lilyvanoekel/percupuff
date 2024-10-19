import { InstrumentId } from "../StoredStateStore";
import { Button2 } from "./elements/Button2";
import { Label } from "./elements/Label";

const InstrumentGroup = ({
  name,
  instrumentIds,
}: {
  name: string;
  instrumentIds: InstrumentId[];
}) => (
  <div style={{ display: "inline-block", marginLeft: "10px" }}>
    <div style={{ textAlign: "center" }}>
      <Label>{name}</Label>
    </div>
    <div style={{ display: "flex" }}>
      {instrumentIds.map((id) => (
        <div key={id}>
          <Button2 width={45} height={63} />
        </div>
      ))}
    </div>
  </div>
);

export const InstrumentPicker = () => (
  <div style={{ padding: "10px" }}>
    <InstrumentGroup name="Kicks" instrumentIds={[0, 1]} />
    <InstrumentGroup name="Snares" instrumentIds={[2, 3]} />
    <InstrumentGroup name="Hihats" instrumentIds={[4, 5, 6]} />
  </div>
);
