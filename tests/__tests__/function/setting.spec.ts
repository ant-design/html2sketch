import { setConfig } from 'html2sketch';

let tempFetch: typeof window.HTML2SKETCH_FETCH_BASE64;
beforeAll(() => {
  tempFetch = window.HTML2SKETCH_FETCH_BASE64;
});

afterAll(() => {
  window.HTML2SKETCH_FETCH_BASE64 = tempFetch;
});
test('setConfig', () => {
  const fetchBase64 = async (url: string) => url;

  setConfig({ fetchBase64 });

  expect(window.HTML2SKETCH_FETCH_BASE64).toEqual(fetchBase64);
});
