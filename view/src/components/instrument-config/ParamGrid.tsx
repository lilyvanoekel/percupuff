import { Label } from "../elements/Label";
import { LetterDisplay } from "../elements/LetterDisplay";
import { ParamKnob } from "../elements/ParamKnob";

import styles from "./ParamGrid.module.css";

export const ParamGrid: React.FC = () => {
  return (
    <>
      <div>
        <Label>Sound Params</Label>
      </div>
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
            text={["FILTER", "CUTOFF"]}
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
            text={["", "DECAY"]}
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
            text={["", ""]}
            color="green"
            align="center"
          />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param="mainLevel" width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param="mainLevel" width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param="mainLevel" width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param="mainLevel" width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob param="mainLevel" width={90} height={115.5} />
        </div>
        <div style={{ marginTop: "6px" }}>
          <ParamKnob width={90} height={115.5} />
        </div>
      </div>
    </>
  );
};
