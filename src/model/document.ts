import { generateID } from '@/common/utils';
import Group from './group';
import Page from './page';
import { makeColorFromCSS } from '../helpers/color';
import layerToSharedStyle from '../parser/sharedLayerStyle';

function pageToPageReference(page: Page) {
  return {
    _class: 'MSJSONFileReference',
    _ref_class: 'MSImmutablePage',
    _ref: `pages/${page.getID()}`,
  };
}

class Document {
  private _objectID: string;
  private _colors: any[];
  private _textStyles: any[];
  private _layerStyles: any[];
  private _pages: Page[];
  private _name?: string;
  constructor() {
    this._objectID = generateID();
    this._colors = [];
    this._textStyles = [];
    this._layerStyles = [];
    this._pages = [];
  }

  setName(name: string) {
    this._name = name;
  }

  setObjectID(id: string) {
    this._objectID = id;
  }

  addPage(page: any) {
    this._pages.push(page);
  }

  addTextStyle(textLayer: any, id: string) {
    this._textStyles.push(layerToSharedStyle(textLayer, id));
  }

  addLayerStyle(layer: Group, id: string) {
    this._layerStyles.push(layerToSharedStyle(layer, id));
  }

  addColor(color: any) {
    this._colors.push(makeColorFromCSS(color));
  }

  toJSON() {
    return {
      _class: 'document',
      do_objectID: this._objectID,
      assets: {
        _class: 'assetCollection',
        colors: this._colors,
      },
      currentPageIndex: 0,
      enableLayerInteraction: true,
      enableSliceInteraction: true,
      foreignSymbols: [],
      layerStyles: {
        _class: 'sharedStyleContainer',
        objects: this._layerStyles,
      },
      layerSymbols: {
        _class: 'symbolContainer',
        objects: [],
      },
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: this._textStyles,
      },
      pages: this._pages.map(pageToPageReference),
    };
  }
}

export default Document;
