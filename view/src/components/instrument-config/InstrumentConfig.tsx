import { InlineBlock } from "../elements/InlineBlock";
import { MidiAssignment } from "./MidiAssignment";
import { NameDisplay } from "./NameDisplay";
import { ParamGrid } from "./ParamGrid";

export const InstrumentConfig: React.FC = () => {
  return (
    <div style={{ padding: "4px 10px 10px 10px" }}>
      <div className="ridge" style={{ marginBottom: "8px" }}></div>
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
