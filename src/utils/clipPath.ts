import ShapeGroup from '../models/Layer/ShapeGroup';
import { pathToShapeGroup, Svgson } from '../parser/svgson';

export const createClipPathMask = (clipPath: string) => {
  if (clipPath.startsWith('path')) {
    // Get path in clip-path, like: path("M0")
    const path = clipPath.slice(6, -2);

    const shapeGroupType = pathToShapeGroup(path);
    const shapePaths = Svgson.shapeGroupDataToLayers(shapeGroupType);
    const shapeGroup = new ShapeGroup(shapeGroupType.frame);

    shapeGroup.addLayers(shapePaths);
    shapeGroup.hasClippingMask = true;
    return shapeGroup;
  }

  return null;
};
