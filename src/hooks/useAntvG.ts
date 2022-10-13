import { Canvas, CanvasEvent } from "@antv/g";
// import { Renderer } from "@antv/g-canvas";
import { Renderer } from "@antv/g-webgl";
import { useEffect, useRef } from "react";
import Stats from "stats.js";

type useAntvGParams = {
  onReady?(): void;
  onAfterRender?(): void;
  onCanvasCreated?(e: Canvas): void;
  width?: number;
  height?: number;
  autoSize?: boolean;
};

const useAntvGCanvas = (params: useAntvGParams) => {
  const {
    onReady,
    onCanvasCreated,
    width = 500,
    height = 500,
    autoSize = false,
  } = params || {};
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Canvas>();

  useEffect(() => {
    let _width = width;
    let _height = height;

    if (autoSize) {
      const { clientWidth, clientHeight } = wrap.current as HTMLDivElement;
      _width = clientWidth;
      _height = clientHeight;
    }

    canvasRef.current = new Canvas({
      container: wrap.current as HTMLDivElement,
      width: _width,
      height: _height,
      renderer: new Renderer(),
    });
    const stats = new Stats();
    stats.showPanel(0);
    const $stats = stats.dom;
    $stats.style.position = "absolute";
    $stats.style.left = "0px";
    $stats.style.top = "0px";
    canvasRef.current.addEventListener(CanvasEvent.READY, () => {
      wrap.current?.appendChild($stats);

      onReady?.();
    });
    onCanvasCreated?.(canvasRef.current);

    canvasRef.current?.addEventListener(CanvasEvent.AFTER_RENDER, () => {
      stats.update();
    });

    return () => {
      canvasRef.current?.destroy();
    };
  }, []);

  return {
    canvasRef,
    wrap,
  };
};

export default useAntvGCanvas;
