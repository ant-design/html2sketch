import { useEffect, useRef, useState } from 'react';

export default () => {
  const ref = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (elements.length === 0 && ref.current) {
      // @ts-ignore
      setElements([ref.current]);
    }
  });
  return { ref, elements };
};
