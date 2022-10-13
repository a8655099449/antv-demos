import React, { FC, ReactElement, useEffect } from "react";
import {  Circle, Text, Line } from "@antv/g";

import interact from "interactjs";
import useAntvGCanvas from "../hooks/useAntvG";

interface IProps {}
const TwoCircles: FC<IProps> = (): ReactElement => {
  const { canvasRef, wrap } = useAntvGCanvas({
    onReady: () => {
      startRender();
    },
  });
  const startRender = () => {
    const circle = new Circle({
      style: {
        r: 50,
        fill: "#1890FF",
        stroke: "#F04864",
        lineWidth: 4,
        cursor: "pointer",
        class: "app1",
      },
    });
    const circle2 = new Circle({
      style: {
        r: 50,
        fill: "#1890FF",
        stroke: "#F04864",
        lineWidth: 4,
        cursor: "pointer",
        class: "app1",
      },
    });

    const text1 = new Text({
      style: {
        text: "Node1", // 文本内容
        fontFamily: "Avenir", // 字体
        fontSize: 22, // 字号
        fill: "#fff", // 文本颜色
        textAlign: "center", // 水平居中
        textBaseline: "middle", // 垂直居中
      },
    });

    const text2 = new Text({
      style: {
        text: "Node2", // 文本内容
        fontFamily: "Avenir", // 字体
        fontSize: 22, // 字号
        fill: "#fff", // 文本颜色
        textAlign: "center", // 水平居中
        textBaseline: "middle", // 垂直居中
      },
    });
    // 为节点1添加交互，鼠标悬停改变颜色
    circle.addEventListener("mouseenter", () => {
      circle.style.fill = "#f00";
    });
    circle.addEventListener("mouseleave", () => {
      circle.style.fill = "#1890FF";
    });

    // 创建边
    const edge = new Line({
      style: {
        x1: 200,
        y1: 200,
        x2: 400,
        y2: 200,
        stroke: "#1890FF",
        lineWidth: 2,
      },
    });
    circle.appendChild(text1);
    circle2.appendChild(text2);
    circle.setPosition(200, 200);
    circle2.setPosition(400, 200);
    canvasRef.current!.appendChild(edge);

    canvasRef.current!.appendChild(circle);
    canvasRef.current!.appendChild(circle2);
    // 使用 interact.js 实现拖拽

    // @ts-ignore
    interact(circle, {
      // 直接传入节点1
      context: canvasRef.current!.document, // 传入上下文
    }).draggable({
      onmove: function (event) {
        // interact.js 告诉我们的偏移量
        const { dx, dy } = event;
        // 改变节点1位置
        circle.translateLocal(dx, dy);
        // 获取节点1位置
        const [nx, ny] = circle.getLocalPosition();
        // 改变边的端点位置
        edge.style.x1 = nx;
        edge.style.y1 = ny;
      },
    });
  };

  return (
    <div>
      <h2>两个圈</h2>
      <div ref={wrap}></div>
    </div>
  );
};

export default TwoCircles;
