import { fabric } from "fabric";
import "fabric-eraser-brush";

export const useFabric = (el, fabricOption) => {
  return new fabric.Canvas(el, fabricOption);
};
