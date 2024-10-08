import { fabric } from "fabric";
import "fabric-eraser-brush";
import { createHistory } from "fabricjs-history";

export const useFabric = (el, fabricOption) => {
  const context = new fabric.Canvas(el, fabricOption);
  createHistory({ canvas: context });
  return context;
};
