class Player {
  static HIT_NON = 0;
  static HIT_LEFT = 1;
  static HIT_RIGHT = 2;
  static HIT_TOP = 3;
  static HIT_BOTTOM = 4;

  constructor() {
    this.pos_x = 320;
    this.pos_y = 700;
    this.width = 80;
    this.height = 30;
    this.grab = false;
  }

  Draw(context) {
    context.fillStyle = "blue";
    context.fillRect(
      this.pos_x - this.width / 2,
      this.pos_y - this.height / 2,
      this.width,
      this.height
    );
  }

  HitTestPoint(x, y) {
    let left = this.pos_x - this.width / 2;
    let right = left + this.width;
    let top = this.pos_y - this.height / 2;
    let bottom = top + this.height;

    if (x > left && x < right) {
      if (y > top && y < bottom) {
        return true;
      }
    }
    return false;
  }

  Move(move_x) {
    this.pos_x += move_x;
  }

  SetGrab(grabbed) {
    this.grab = grabbed;
  }

  IsGrabbed() {
    return this.grab;
  }

  //プレイヤーの座標
  GetRect() {
    let rect = [];
    rect.push(this.pos_x - this.width / 2); //0 左
    rect.push(this.pos_x + this.width / 2); //1 右
    rect.push(this.pos_y - this.height / 2); //2　上
    rect.push(this.pos_y + this.height / 2); //3 下
    return rect;
  }
  //球とプレイヤーの当たり判定
  Collision(ball_left, ball_right, ball_top, ball_bottom) {
    //プレイヤーの座標取得
    let rect = this.GetRect();

    if (ball_right < rect[0]) {
      return Player.HIT_NON;
    }
    if (ball_left > rect[1]) {
      return Player.HIT_NON;
    }
    if (ball_bottom < rect[2]) {
      return Player.HIT_NON;
    }
    if (ball_top > rect[3]) {
      return Player.HIT_NON;
    }

    let radius = (ball_right - ball_left) / 2;
    let ball_center_x = ball_left + radius;
    let ball_center_y = ball_top + radius;

    if (ball_center_x < rect[0]) {
      return Player.HIT_LEFT;
    }
    if (ball_center_x > rect[1]) {
      return Player.HIT_RIGHT;
    }
    if (ball_center_y < rect[2]) {
      return Player.HIT_TOP;
    }
    return Player.HIT_BOTTOM;
  }
}
