const innerFetch: typeof fetch = (input, init) => {
  const _fetch = window.HTML2SKETCH_FETCH ?? fetch;
  return _fetch(input, init);
};

export default innerFetch;
