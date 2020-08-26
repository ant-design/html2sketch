import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { uuid } from '../utils/utils';
import { AnyLayer } from '../type';

const layerToSharedStyle = (
  layer: AnyLayer,
  id?: string,
): FileFormat.SharedStyle => {
  return {
    _class: 'sharedStyle',
    do_objectID: id || uuid(),
    name: layer.name,
    value: layer.style?.toSketchJSON(),
  };
};

export default layerToSharedStyle;
