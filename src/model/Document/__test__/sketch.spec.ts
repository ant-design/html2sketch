import Sketch from '../Sketch';
import { Text } from '../../index';

describe('Sketch 文档类', function () {
  it('addPage', () => {
    const doc = new Sketch();

    expect(doc.toSketchJSON()).toMatchObject({
      pages: [],
    });

    doc.addPage({ id: 'my-page-id' });
    expect(doc.toSketchJSON()).toMatchObject({
      pages: [
        expect.objectContaining({
          _class: 'MSJSONFileReference',
          _ref_class: 'MSImmutablePage',
          _ref: 'pages/my-page-id',
        }),
      ],
    });
  });

  it('addTextStyle', () => {
    const doc = new Sketch();

    expect(doc.toSketchJSON()).toMatchObject({
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: [],
      },
    });

    doc.addTextStyle(new Text({ text: '123', style: { color: '#eee' } }));

    expect(doc.toSketchJSON()).toMatchObject({
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: [
          {
            _class: 'sharedStyle',
            do_objectID: 'UUID',
            name: '123',
          },
        ],
      },
    });
  });
});
