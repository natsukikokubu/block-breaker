class Background {
  static HIT_NON = 0;
  static HIT_LEFT = 1;
  static HIT_RIGHT = 2;
  static HIT_TOP = 3;
  static HIT_BOTTOM = 4;
  Draw(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  //背景と球の当たり判定
  /**
   * 球と背景との当たり判定をします。backgroundの長方形の中に球があるかどうかを判定します。
  backgroundの左上の座標を(0、0)として右下の座標は(SCREEN_WIDTH、SCREEN＿HEIGHT)となります。
   * @param {*} left 　球の左
   * @param {*} right 球の右
   * @param {*} top 球の上
   * @param {*} bottom 球の下
   * @returns
   */
  Collision(left, right, top, bottom) {
    if (left <= 0) {
      return Background.HIT_LEFT;
    }
    if (right >= SCREEN_WIDTH) {
      return Background.HIT_RIGHT;
    }
    if (top <= 0) {
      return Background.HIT_TOP;
    }
    if (bottom >= SCREEN_HEIGHT) {
      return Background.HIT_BOTTOM;
    }
    return Background.HIT_NON;
  }
}
