import { useEffect, useRef, useState } from 'react';

export default <T = any>() => {
  const ref = useRef<T>(null);
  const [elements, setElements] = useState<T[]>([]);

  useEffect(() => {
    if (elements.length === 0 && ref.current) {
      // @ts-ignore
      setElements([ref.current]);
    }
  });
  return { ref, elements, setElements };
};
