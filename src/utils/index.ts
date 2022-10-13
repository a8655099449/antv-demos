import { Circle } from "@antv/g";

type TGetCircleP = { x: number; y: number };
export const getCircle = ({ x = 100, y = 100 }: Partial<TGetCircleP> = {}) => {
  const circle = new Circle({
    style: {
      fill: "#C6E5FF",
      stroke: "#5B8FF9",
      r: 100,
      lineWidth: 1,
      cx: 200,
      cy: 200,
    },
  });
  circle.setPosition(x, y);

  return circle;
};
