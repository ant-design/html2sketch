import uuid from '../../helpers/uuid';

class StyleBase {
  constructor() {
    this.id = uuid();
  }
  id: string;
  name: string;
}

export default StyleBase;
