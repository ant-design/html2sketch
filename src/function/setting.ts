type FetchBase64 = (url: string) => Promise<string>;

interface Config {
  fetchBase64?: FetchBase64;
}

declare global {
  interface Window {
    HTML2SKETCH_FETCH_BASE64: (url: string) => Promise<string>;
  }
}
/**
 * 进行全局配置
 */
export const setConfig = (config: Config) => {
  const { fetchBase64 } = config;
  if (typeof fetchBase64 === 'function') {
    window.HTML2SKETCH_FETCH_BASE64 = fetchBase64;
  }
};
