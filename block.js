/**ブロックを表現するクラスで、球との当たり判定をし、ブロックの生存か否かを表している */
class Block {
  static HIT_NON = 0;
  static HIT_LEFT = 1;
  static HIT_RIGHT = 2;
  static HIT_TOP = 3;
  static HIT_BOTTOM = 4;

  static GenerateBlocks(block_row_max) {
    const block_width = 64;
    const block_height = 32;
    const block_colum_max = 10;

    const blockColors = [
      "red",
      "blue",
      "green",
      "white",
      "yellow",
      "aqua",
      "purple",
    ];

    let posX = 0;
    let posY = 0;
    let color_index = 0;
    let blocks = [];

    /**二重ループで 、blockの縦　✕　横の階数ループする*/
    for (let y = 0; y < block_row_max; y++) {
      for (let x = 0; x < block_colum_max; x++) {
        // blockColorsから一つ色を選択して、バラバラのいろを入れる
        let color = blockColors[color_index];
        // 色がばらばらになるようにインクリメントする
        color_index++;
        // color_indexがblockColorsの最後まで行ったらリセットして最初から色をいれていく
        if (color_index >= blockColors.length) {
          color_index = 0;
        }

        // 得られたcolorをもとにBlockインスタンスを生成する
        let tmp = new Block(posX, posY, color);
        // blockに詰める
        blocks.push(tmp);
        // x軸方向の位置を、詰めたブロックの横幅分ずらす
        posX += block_width;
      }
      // x軸方向の位置を、詰めたブロックの縦幅分分ずらす
      posY += block_height;
      // 内部のforから抜けたということは、一行ぶん終わったということなので、xの位置をリセットする
      posX = 0;
    }

    return blocks;
  }
  constructor(x, y, color) {
    this.width = 64;
    this.height = 32;
    this.posX = x;
    this.posY = y;
    this.color = color;
    this.alive = true;
  }

  Draw() {
    context.fillStyle = this.color;
    context.fillRect(this.posX, this.posY, this.width, this.height);
  }

  GetRect() {
    let rect = [];
    rect.push(this.posX); //0 左
    rect.push(this.posX + this.width); //1 右
    rect.push(this.posY); //2　上
    rect.push(this.posY + this.height); //3 下
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
