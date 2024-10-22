import {
  instrumentKeyToLevelParam,
  instrumentKeyToPanningParam,
  instrumentKeyToVelocityParam,
  instrumentToCustomParam,
} from "../../params";
import { useStoredStateStore } from "../../StoredStateStore";
import { Label } from "../elements/Label";
import { LetterDisplay } from "../elements/LetterDisplay";
import { ParamKnob } from "../elements/ParamKnob";

import styles from "./ParamGrid.module.css";

export const ParamGrid: React.FC = () => {
  const { storedState } = useStoredStateStore();
  const customParams =
    instrumentToCustomParam[storedState.selectedInstrument] ?? [];

  return (
    <div style={{ marginTop: "15px" }}>
      {/* <div>
        <Label>Sound Params</Label>
      </div> */}
      <div className={styles.grid}>
        <div>
          <Label>Level</Label>
        </div>
        <div>
          <Label>Panning</Label>
        </div>
        <div>
          <Label>Velocity</Label>
        </div>
        <div>
          <LetterDisplay
            letterWidth={12}
            letterHeight={18}
            lineLength={9}
            numberOfLines={2}
            text={customParams[0]?.[1]}
            color="green"
            align="center"
          />
        </div>
        <div>
          <LetterDisplay
            letterWidth={12}
            letterHeight={18}
            lineLength={9}
            numberOfLines={2}
            text={customParams[1]?.[1]}
            color="green"
            align="center"
          />
        </div>
        <div>
          <LetterDisplay
            letterWidth={12}
            letterHeight={18}
            lineLength={9}
            numberOfLines={2}
            text={customParams[2]?.[1]}
            color="green"
            align="center"
          />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob
            param={instrumentKeyToLevelParam(storedState.selectedInstrument)}
            width={90}
            height={115.5}
          />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob
            param={instrumentKeyToPanningParam(storedState.selectedInstrument)}
            width={90}
            height={115.5}
          />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob
            param={instrumentKeyToVelocityParam(storedState.selectedInstrument)}
            width={90}
            height={115.5}
          />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param={customParams[0]?.[0]} width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param={customParams[1]?.[0]} width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param={customParams[2]?.[0]} width={90} height={115.5} />
        </div>
      </div>
    </div>
  );
};
