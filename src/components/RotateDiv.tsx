import React, { FC, ReactElement, useEffect, useRef, useState } from "react";

interface IProps {}
const RotateDiv: FC<IProps> = (): ReactElement => {
  const computingAngle = ({ x1, x2, y1, y2 }) => {
    var radian = Math.atan2(y1 - y2, x1 - x2); // 返回来的是弧度

    var angle = (180 / Math.PI) * radian; // 根据弧度计算角度
    return angle;
  };
  const [rotate,setRotate] = useState(0);

  const ref = useRef({
    startPosition: { x: 0, y: 0 },
    movePosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const rotate = document.querySelector("#rotate");
    console.log("👴2022-10-14 14:17:21 rotate.tsx line:14", rotate);
    rotate.addEventListener("mousedown", (e: any) => {
      ref.current.startPosition = {
        x: e.pageX,
        y: e.pageY,
      };
      rotate.addEventListener(`mousemove`, handleMove);
      rotate.addEventListener(`mouseup`, handleMouseup);
    });
    const handleMouseup = () => {
      rotate.removeEventListener(`mousemove`, handleMove);
      rotate.removeEventListener(`mouseup`, handleMouseup);
    };

    const handleMove = (e) => {
      ref.current.movePosition = {
        x: e.pageX,
        y: e.pageY,
      };

      const { startPosition, movePosition } = ref.current;
      const r = computingAngle({
        x1: startPosition.x,
        y1: startPosition.y,
        x2: movePosition.x,
        y2: movePosition.y,
      });
      setRotate(r)
      console.log("👴2022-10-14 14:28:09 RotateDiv.tsx line:50", r);
    };

    // rotate.addEventListener("mouseup", (e) => {
    //   console.log("👴mouseup");
    // });
  }, []);

  return (
    <div
      style={{
        border: `1px solid #000`,
        width: 100,
        height: 100,
        margin: 100,
        transform: `rotate(${rotate}deg)`
      }}
      id="rotate"
      // onMouseDown={}
    >
      🐎
    </div>
  );
};

export default RotateDiv;
