class Block {
  static HIT_NON = 0;
  static HIT_LEFT = 1;
  static HIT_RIGHT = 2;
  static HIT_TOP = 3;
  static HIT_BOTTOM = 4;

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
    this.alive = true;
  }

  Draw() {
    context.fillStyle = this.color;
    context.fillRect(this.pos_x, this.pos_y, this.width, this.height);
  }

  GetRect() {
    let rect = [];
    rect.push(this.pos_x); //0 左
    rect.push(this.pos_x + this.width); //1 右
    rect.push(this.pos_y); //2　上
    rect.push(this.pos_y + this.height); //3 下
    return rect;
  }

  Collision(ball_left, ball_right, ball_top, ball_bottom) {
    //プレイヤーの座標取得
    let rect = this.GetRect();

    if (ball_right < rect[0]) {
      return Block.HIT_NON;
    }
    if (ball_left > rect[1]) {
      return Block.HIT_NON;
    }
    if (ball_bottom < rect[2]) {
      return Block.HIT_NON;
    }
    if (ball_top > rect[3]) {
      return Block.HIT_NON;
    }

    let radius = (ball_right - ball_left) / 2;
    let ball_center_x = ball_left + radius;
    let ball_center_y = ball_top + radius;

    if (ball_center_x < rect[0]) {
      return Block.HIT_LEFT;
    }
    if (ball_center_x > rect[1]) {
      return Block.HIT_RIGHT;
    }
    if (ball_center_y < rect[2]) {
      return Block.HIT_TOP;
    }
    return Block.HIT_BOTTOM;
  }

  SetAlive(is_alive) {
    this.alive = is_alive;
  }

  IsAlive() {
    return this.alive;
  }
}
