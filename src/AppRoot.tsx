import React from "react";
import {Composition, Folder} from "remotion";
import {RemotionRoot as LegacyRoot} from "./Root";
import {MotionProject, calculateWorkstationMetadata} from "./workstation/MotionProject";
import {workstationDemoProject} from "./workstation/defaults";
import {workstationProjectSchema} from "./workstation/schema";

export const AppRoot: React.FC = () => {
  return (
    <>
      <Folder name="Workstation">
        <Composition
          id="VMT-MotionProject"
          component={MotionProject}
          durationInFrames={workstationDemoProject.durationInFrames}
          fps={workstationDemoProject.fps}
          width={workstationDemoProject.width}
          height={workstationDemoProject.height}
          schema={workstationProjectSchema}
          defaultProps={workstationDemoProject}
          calculateMetadata={calculateWorkstationMetadata}
        />
      </Folder>
      <LegacyRoot />
    </>
  );
};
