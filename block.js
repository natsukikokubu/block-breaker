class Block {
  static GenerateBlocks(block_row_max) {
    let block_width = 64;
    let block_height = 32;
    let block_colum_max = 10;

    let color_table = [
      "red",
      "blue",
      "green",
      "white",
      "yellow",
      "aqua",
      "purple",
    ];

    let pos_x = 0;
    let pos_y = 0;
    let color_index = 0;
    let blocks = [];

    for (let y = 0; y < block_row_max; y++) {
      for (let x = 0; x < block_colum_max; x++) {
        let color = color_table[color_index];
        color_index++;
        if (color_index >= color_table.length) {
          color_index = 0;
        }

        let tmp = new Block(pos_x, pos_y, color);
        blocks.push(tmp);
        pos_x += block_width;
      }
      pos_y += block_height;
      pos_x = 0;
    }

    return blocks;
  }
  constructor(x, y, color) {
    this.width = 64;
    this.height = 32;
    this.pos_x = x;
    this.pos_y = y;
    this.color = color;
  }

  Draw() {
    context.fillStyle = this.color;
    context.fillRect(this.pos_x, this.pos_y, this.width, this.height);
  }
}
