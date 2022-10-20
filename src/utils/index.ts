import { Circle } from "@antv/g";
import G6, { Menu } from "@antv/g6";

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

/**
 * 创建上下文菜单（右键菜单）
 */
export const createContextMenu = ({ handleMenuClick = () => {} } = {}) => {
  const contextMenu = new Menu({
    getContent(evt) {
      let header;
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
        header = "Canvas ContextMenu";
      } else if (evt.item) {
        const itemType = evt.item.getType();
        header = `${itemType.toUpperCase()} ContextMenu`;
      }
      return `
      <h3>${header}</h3>
      <ul>
        <li title='1'>li 1</li>
        <li title='2'>li 2</li>
        <li>li 3</li>
        <li>li 4</li>
        <li>li 5</li>
      </ul>`;
    },
    handleMenuClick: handleMenuClick,
    // offsetX and offsetY include the padding of the parent container
    // 需要加上父级容器的 padding-left 16 与自身偏移量 10
    offsetX: 16 + 10,
    // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
    offsetY: 0,
    // the types of items that allow the menu show up
    // 在哪些类型的元素上响应
    itemTypes: ["node", "edge", "canvas"],
  });
  return contextMenu;
};

/**
 * 创建工具栏
 */
export const createToolBar = () => {
  const toolbar = new G6.ToolBar({
    position: { x: 500, y: 10 },
  });
  return toolbar;
};

/**
 * 注册添加节点的事件
 */
export const registerBehaviorAddNode = () => {
  let addedCount = 5;
  G6.registerBehavior("click-add-node", {
    // Set the events and the corresponding responsing function for this behavior
    getEvents() {
      // The event is canvas:click, the responsing function is onClick
      return {
        "canvas:click": "onClick",
      };
    },
    // Click event
    onClick(ev) {
      console.log(`👴 ~ file: index.ts ~ line 82 ~ onClick ~ ev`, ev);
      const self = this;
      const graph = self.graph;
      // Add a new node
      graph.addItem("node", {
        x: ev.clientX - 50,
        y: ev.clientY - 80,
        id: `node-${addedCount}`, // Generate the unique id
        label: `node-${addedCount}`,
      });
      addedCount++;
    },
  });
};
/**
 * 注册连线的事件
 */
export const registerBehaviorAddEdge = () => {
  G6.registerBehavior("click-add-edge", {
    // Set the events and the corresponding responsing function for this behavior
    getEvents() {
      return {
        "node:click": "onClick", // The event is canvas:click, the responsing function is onClick
        mousemove: "onMousemove", // The event is mousemove, the responsing function is onMousemove
        "edge:click": "onEdgeClick", // The event is edge:click, the responsing function is onEdgeClick
      };
    },
    // The responsing function for node:click defined in getEvents
    onClick(ev) {
      console.log(`👴 ~ file: index.ts ~ line 111 ~ onClick ~ ev`, ev);
      const self = this;
      const node = ev.item;
      const graph = self.graph;
      // The position where the mouse clicks
      const point = { x: ev.x, y: ev.y };
      const model = node.getModel();
      if (self.addingEdge && self.edge) {
        graph.updateItem(self.edge, {
          target: model.id,
        });

        self.edge = null;
        self.addingEdge = false;
      } else {
        // Add anew edge, the end node is the current node user clicks
        self.edge = graph.addItem("edge", {
          source: model.id,
          target: model.id,
        });
        self.addingEdge = true;
      }
    },
    // The responsing function for mousemove defined in getEvents
    onMousemove(ev) {
      const self = this;
      // The current position the mouse clicks
      const point = { x: ev.x, y: ev.y };
      if (self.addingEdge && self.edge) {
        // Update the end node to the current node the mouse clicks
        self.graph.updateItem(self.edge, {
          target: point,
        });
      }
    },
    // The responsing function for edge:click defined in getEvents
    onEdgeClick(ev) {
      const self = this;
      const currentEdge = ev.item;
      if (self.addingEdge && self.edge === currentEdge) {
        self.graph.removeItem(self.edge);
        self.edge = null;
        self.addingEdge = false;
      }
    },
  });
};
