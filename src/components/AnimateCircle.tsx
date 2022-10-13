import { IAnimation } from "@antv/g";
import { Button } from "antd";
import React, { FC, ReactElement, useRef } from "react";
import useAntvGCanvas from "../hooks/useAntvG";
import { getCircle } from "../utils";

interface IProps {}
const AnimateCircle: FC<IProps> = (): ReactElement => {
  const animationRef = useRef<IAnimation>();

  const handleReady = () => {
    const c = getCircle({
      x: 200,
      y: 200,
    });

    canvasRef.current?.appendChild(c);

    const animation = c.animate(
      [{ transform: "scale(1)" }, { transform: "scale(2)" }],
      {
        duration: 500,
        easing: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      }
    ) as IAnimation;

    // get triggered when animation finished
    animation.onfinish = (e) => {
      console.log("finish!", e.target);
    };
    animation.finished.then(() => {
      console.log("finish promise resolved");
    });
    // get triggered at the end of each frame in a running animation
    animation.onframe = (e) => {
      // console.log(e.target.effect.getComputedTiming().progress);
      // console.log("frame ended!", e.target, e.target.playState);
    };
    animationRef.current = animation;
  };

  const { wrap, canvasRef } = useAntvGCanvas({
    onReady: handleReady,
  });

  return (
    <div>
      <Button
        onClick={(e) => {
          animationRef.current?.play();
        }}
      >
        play
      </Button>
      <div ref={wrap}></div>
    </div>
  );
};

export default AnimateCircle;
