import { v4 as uuid } from 'uuid';

export default () => {
  return uuid().toUpperCase();
};
