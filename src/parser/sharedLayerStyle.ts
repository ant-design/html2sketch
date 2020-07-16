import FileFormat from '@sketch-hq/sketch-file-format-ts';
import uuid from '../helpers/uuid';
import Group from '../model/Layer/group';

const layerToSharedStyle = (
  layer: Group,
  id?: string
): FileFormat.SharedStyle => {
  return {
    _class: 'sharedStyle',
    do_objectID: id || uuid(),
    name: layer._name,
    value: layer.style.toSketchJSON(),
  };
};

export default layerToSharedStyle;
