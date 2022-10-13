import { CanvasEvent, Circle, ICamera, Line, Text } from "@antv/g";
import React, { FC, ReactElement, useRef } from "react";
import useAntvGCanvas from "../hooks/useAntvG";
import Hammer from "hammerjs";

interface IProps {}
const Camera: FC<IProps> = (): ReactElement => {
  const camera = useRef<ICamera>();

  const mapNodeSize = (
    nodes: any[],
    propertyName: string,
    visualRange: any
  ) => {
    let minp = 9999999999;
    let maxp = -9999999999;
    nodes.forEach((node) => {
      node[propertyName] = Math.pow(node[propertyName], 1 / 3);
      minp = node[propertyName] < minp ? node[propertyName] : minp;
      maxp = node[propertyName] > maxp ? node[propertyName] : maxp;
    });
    const rangepLength = maxp - minp;
    const rangevLength = visualRange[1] - visualRange[0];
    nodes.forEach((node) => {
      node.size =
        ((node[propertyName] - minp) / rangepLength) * rangevLength +
        visualRange[0];
    });
  };
  const addHammer = () => {
    const hammer = new Hammer(canvasRef.current as any);
    hammer.on("pan", (ev) => {
      const x = -ev.deltaX / Math.pow(2, camera.current?.getZoom() || 0);
      const y = -ev.deltaY / Math.pow(2, camera.current?.getZoom() || 0);

      console.log("👴2022-10-13 16:08:55 Camera.tsx line:36", x, y);
      camera.current?.pan(x, y);
    });
  };

  const startRender = async () => {
    camera.current!.pan(500, 500);
    camera.current!.setZoom(0.3);
    const { edges, nodes } = await fetch(
      "https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json"
    ).then((res) => res.json());

    nodes.forEach((node: any) => {
      node.label = node.olabel;
      node.degree = 0;
      edges.forEach((edge: any) => {
        if (edge.source === node.id || edge.target === node.id) {
          node.degree++;
        }
      });
    });

    mapNodeSize(nodes, "degree", [1, 15]);

    // console.log("👴2022-10-13 15:23:34 Camera.tsx line:11", edges);
    edges.forEach(({ startPoint, endPoint }: any) => {
      const line = new Line({
        style: {
          x1: startPoint.x * 10,
          y1: startPoint.y * 10,
          x2: endPoint.x * 10,
          y2: endPoint.y * 10,
          stroke: "#1890FF",
          lineWidth: 3,
        },
      });
      canvasRef.current!.appendChild(line);
    });

    nodes.forEach(({ size, x, y, label }: any) => {
      const circle = new Circle({
        style: {
          fill: "#C6E5FF",
          stroke: "#5B8FF9",
          r: size * 10,
          lineWidth: 1,
        },
      });
      canvasRef.current!.appendChild(circle);
      circle.setPosition(x * 10, y * 10);

      const text = new Text({
        style: {
          text: label,
          fontSize: 12,
          fontFamily: "PingFang SC",
          fill: "#1890FF",
        },
      });
      circle.appendChild(text);

      circle.addEventListener("mouseenter", () => {
        circle.style.fill = "#2FC25B";
      });

      circle.addEventListener("mouseleave", () => {
        circle.style.fill = "#C6E5FF";
      });
    });
    bindWheelHandler();
    addHammer();
  };

  const { wrap, canvasRef } = useAntvGCanvas({
    onReady: startRender,
    onCanvasCreated: (c) => {
      camera.current = c.getCamera();
      c.addEventListener(CanvasEvent.AFTER_RENDER, () => {
        camera.current!.rotate(0, 0, 0.1);
      });
    },
    autoSize: true,
  });

  const bindWheelHandler = () => {
    // update Camera's zoom
    // @see https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/OrbitControls.js
    const minZoom = 0;
    const maxZoom = Infinity;
    canvasRef.current
      ?.getContextService()
      ?.getDomElement() // g-canvas/webgl 为 <canvas>，g-svg 为 <svg>
      ?.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          let zoom;
          if (e.deltaY < 0) {
            zoom = Math.max(
              minZoom,
              Math.min(maxZoom, camera.current!.getZoom() / 0.95)
            );
          } else {
            zoom = Math.max(
              minZoom,
              Math.min(maxZoom, camera.current!.getZoom() * 0.95)
            );
          }
          console.log("👴2022-10-13 16:04:28 Camera.tsx line:143", zoom);
          camera.current!.setZoom(zoom);
        },
        { passive: false }
      );
  };

  return (
    <div>
      <div
        ref={wrap}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </div>
  );
};

export default Camera;
