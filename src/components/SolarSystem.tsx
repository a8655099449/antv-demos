import { Circle, Group, Text, CanvasEvent } from "@antv/g";
import React, { FC, ReactElement } from "react";
import useAntvGCanvas from "../hooks/useAntvG";

interface IProps {}
const SolarSystem: FC<IProps> = (): ReactElement => {
  const { wrap, canvasRef } = useAntvGCanvas({
    onReady() {
      const solarSystem = new Group({
        id: "solarSystem",
      });
      const earthOrbit = new Group({
        id: "earthOrbit",
      });
      const moonOrbit = new Group({
        id: "moonOrbit",
      });

 

      const sun = new Circle({
        id: "sun",
        style: {
          r: 100,
          fill: "#1890FF",
          stroke: "#F04864",
          lineWidth: 4,
        },
      });

      const earth = new Circle({
        id: "earth",
        style: {
          r: 50,
          fill: "#1890FF",
          stroke: "#F04864",
          lineWidth: 4,
        },
      });
      const moon = new Circle({
        id: "moon",
        style: {
          r: 25,
          fill: "#1890FF",
          stroke: "#F04864",
          lineWidth: 4,
        },
      });

      solarSystem.appendChild(sun);
      solarSystem.appendChild(earthOrbit);
      moonOrbit.appendChild(moon);

      earthOrbit.appendChild(earth);
      earthOrbit.appendChild(moonOrbit);

      earthOrbit.translate(100, 0);
      moonOrbit.translate(100, 0);

      solarSystem.setPosition(300, 250);
      canvasRef.current!.appendChild(solarSystem);

      canvasRef.current?.addEventListener(CanvasEvent.AFTER_RENDER, () => {
        solarSystem.rotateLocal(1);
        earthOrbit.rotateLocal(500);
      });
    },
  });

  return (
    <div>
      <h2> 太阳系</h2>
      <div ref={wrap} />
    </div>
  );
};

export default SolarSystem;
