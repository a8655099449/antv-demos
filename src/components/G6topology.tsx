import { Graph, Tooltip } from "@antv/g6";
import { Select } from "antd";
import React, { FC, ReactElement, useEffect, useRef } from "react";
import {
  createContextMenu,
  createToolBar,
  registerBehaviorAddEdge,
  registerBehaviorAddNode,
} from "../utils";
// 定义数据源
const data = {
  nodes: [
    {
      id: "0",
      label: "node-0",
      x: 100,
      y: 100,
      description: "This is node-0.",
      subdescription: "This is subdescription of node-0.",
    },
    {
      id: "1",
      label: "node-1",
      x: 250,
      y: 100,
      description: "This is node-1.",
      subdescription: "This is subdescription of node-1.",
    },
    {
      id: "2",
      label: "node-2",
      x: 150,
      y: 310,
      description: "This is node-2.",
      subdescription: "This is subdescription of node-2.",
    },
    {
      id: "3",
      label: "node-3",
      x: 320,
      y: 310,
      description: "This is node-3.",
      subdescription: "This is subdescription of node-3.",
    },
  ],
  edges: [
    {
      id: "e0",
      source: "0",
      target: "1",
      description: "This is edge from node 0 to node 1.",
      style: { lineDash: [1, 2] },
      type: "arc",
    },
    {
      id: "e1",
      source: "0",
      target: "2",
      description: "This is edge from node 0 to node 2.",
    },
    {
      id: "e2",
      source: "0",
      target: "3",
      description: "This is edge from node 0 to node 3.",
    },
  ],
};

interface IProps {}
const G6topology: FC<IProps> = (): ReactElement => {
  const dom = useRef<HTMLDivElement>(null);
  const graphInstance = useRef<Graph>();
  const startRender = () => {
    const contextMenu = createContextMenu({
      handleMenuClick(...e) {
        console.log("👴2022-10-14 09:43:23 G6topology.tsx line:68", e);
      },
    });
    registerBehaviorAddNode();
    registerBehaviorAddEdge();
    const toolbar = createToolBar();

    const t = insertTooltips();
    const g = new Graph({
      container: dom.current as HTMLDivElement, // 图的 DOM 容器
      fitView: true, // 是否开启画布自适应。开启后图自动适配画布大小。
      fitViewPadding: 100, // 画布的padding值

      defaultNode: {
        size: [80, 40],
        type: "rect",
      },
      plugins: [t, contextMenu, toolbar],
      // 设置为true，启用 redo & undo 栈功能
      enabledStack: true,
      modes: {
        // Defualt mode
        // default: ["drag-canvas", "zoom-canvas", "drag-node"],
        // Adding node mode
        default: [
          "click-add-node",
          "drag-node",
          "drag-canvas",
          "click-add-edge",
        ],
        // Adding edge mode
        addEdge: ["click-add-edge", "click-select"],
      },
      nodeStateStyles: {
        // The node styles in selected state
        selected: {
          stroke: "#666",
          lineWidth: 2,
          fill: "steelblue",
        },
      },
      defaultEdge: {
        type: "extra-shape-edge",
        style: {
          stroke: "#F6BD16",
        },
      },
    });
    g.data(data); // 初始化的图数据，是一个包括 nodes 数组和 edges 数组的对象
    g.render(); // 渲染图
    g.on("node:mouseenter", (e: any) => {
      g.setItemState(e.item, "active", true);
    });
    g.on("node:mouseleave", (e: any) => {
      g.setItemState(e.item, "active", false);
    });
    graphInstance.current = g;
  };
  const insertTooltips = () => {
    return new Tooltip({
      offsetX: 10,
      offsetY: 10,
      // the types of items that allow the tooltip show up
      // 允许出现 tooltip 的 item 类型
      itemTypes: ["node", "edge"],
      // custom the tooltip's content
      // 自定义 tooltip 内容
      getContent: (e: any) => {
        const outDiv = document.createElement("div");
        outDiv.style.width = "fit-content";
        //outDiv.style.padding = '0px 0px 20px 0px';
        outDiv.innerHTML = `
          <h4>Custom Content</h4>
            <div>Type: ${e.item.getType()}</div>
       
            <div>Label: ${e.item.getModel().label || e.item.getModel().id}</div>
          `;
        return outDiv;
      },
      fixToNode: [0.3, 1],
    });
  };

  useEffect(() => {
    startRender();
  }, []);

  return (
    <div>
      <div
        style={{
          margin: 10,
        }}
      >
        <Select
          options={[
            {
              value: "default",
              label: "默认模式",
            },
            {
              value: "addNode",
              label: "添加节点",
            },
            {
              value: "addEdge",
              label: "添加线",
            },
          ]}
          defaultValue="default"
          onChange={(e) => {
            console.log(`👴 ~ file: G6topology.tsx ~ line 175 ~ e`, e);
            graphInstance.current.setMode(e);
          }}
        />
      </div>
      <div
        ref={dom}
        style={{
          height: 500,
          width: 500,
        }}
      ></div>
    </div>
  );
};

export default G6topology;
