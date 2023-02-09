import Previewer from 'dumi/theme-default/builtins/Previewer';
import React from 'react';

import { TestLayout, useElements } from './ToSketch';

const CustomPreviewer: typeof Previewer = ({
  children,
  hideSketchLayout,
  ...props
}) => {
  const { ref, elements } = useElements();
  return (
    <Previewer {...props}>
      {hideSketchLayout ? (
        children
      ) : (
        <TestLayout elements={elements}>
          <div ref={ref}>{children}</div>
        </TestLayout>
      )}
    </Previewer>
  );
};

export default CustomPreviewer;
