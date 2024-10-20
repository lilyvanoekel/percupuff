import { InlineBlock } from "../elements/InlineBlock";
import { MidiAssignment } from "./MidiAssignment";
import { NameDisplay } from "./NameDisplay";
import { ParamGrid } from "./ParamGrid";

export const InstrumentConfig: React.FC = () => {
  return (
    <div style={{ padding: "10px" }}>
      <InlineBlock>
        <NameDisplay />
      </InlineBlock>
      <InlineBlock style={{ marginLeft: "10px" }}>
        <MidiAssignment />
      </InlineBlock>
      <ParamGrid />
    </div>
  );
};
