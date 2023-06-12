class BackGround {
  static HIT_NON = 0;
  static HIT_LEFT = 1;
  static HIT_RIGHT = 2;
  static HIT_TOP = 3;
  static HIT_BOTTOM = 4;
  constructor() {}
  Draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  //背景と球の当たり判定
  Collision(left, right, top, bottom) {
    if (left <= 0) {
      return BackGround.HIT_LEFT;
    }
    if (right >= SCREEN_WIDTH) {
      return BackGround.HIT_RIGHT;
    }
    if (top <= 0) {
      return BackGround.HIT_TOP;
    }
    if (bottom >= SCREEN_HEIGHT) {
      return BackGround.HIT_BOTTOM;
    }
    return BackGround.HIT_NON;
  }
}
