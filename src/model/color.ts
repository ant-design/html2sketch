class Color {
  type = 'ColorAsset';
  color: string;
  name: string;
  constructor(hex: string, name?: string) {
    this.color = hex;
    this.name = name || hex.toUpperCase();
  }
}

export default Color;
