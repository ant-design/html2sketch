import { SymbolMaster } from './model';

export interface CGPoint {
  x: number;
  y: number;
}
export { GroupLayoutType } from './helpers/layout';

export type HandleSymbolFn = (symbol: SymbolMaster) => void;
