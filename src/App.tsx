import React, { FC, ReactElement, useEffect } from "react";

import TwoCircles from "./components/TwoCircles";
import SolarSystem from "./components/SolarSystem";
import Camera from "./components/Camera";
import AnimateCircle from "./components/AnimateCircle";
import G6topology from "./components/G6topology";
import RotateDiv from "./components/RotateDiv";
// import Rotate from "./components/Rotate";


interface IProps {}
const App: FC<IProps> = (): ReactElement => {
  return (
    <div>
      {/* <RotateDiv /> */}
      <G6topology />
    {/*   <TwoCircles />
      <SolarSystem />
      <Camera />
      <AnimateCircle /> */}
    </div>
  );
};

export default App;
