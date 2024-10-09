import { fabric } from "fabric";
import "fabric-eraser-brush";

export const useFabric = (el, fabricOption) => {
  const context = new fabric.Canvas(el, fabricOption);
  return context;
};
