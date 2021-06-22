interface Config {
  fetch?: typeof fetch;
}
/**
 * 进行全局配置
 */
export const setConfig = (config: Config) => {
  const { fetch } = config;
  if (typeof fetch === 'function') {
    window.HTML2SKETCH_FETCH = fetch;
  }
};
