import { SymbolMaster } from './model';

export interface CGPoint {
  x: number;
  y: number;
}
export { GroupLayoutType } from './utils/layout';

export type HandleSymbolFn = (symbol: SymbolMaster) => void;
