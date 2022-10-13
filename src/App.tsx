import React, { FC, ReactElement, useEffect } from "react";

import TwoCircles from "./components/TwoCircles";
import SolarSystem from "./components/SolarSystem";
import Camera from "./components/Camera";
import AnimateCircle from "./components/AnimateCircle";

interface IProps {}
const App: FC<IProps> = (): ReactElement => {
  return (
    <div>
      <TwoCircles />
      <SolarSystem />
      <Camera />
      <AnimateCircle />
    </div>
  );
};

export default App;
