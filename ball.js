class Ball {
  constructor() {
    this.posX = 320;
    this.posY = 675;
    this.radius = 10;
    this.moveX = 0;
    this.moveY = 0;
  }

  Draw(context) {
    context.fillStyle = "white";
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fill();
  }

  SetSpeed(x, y) {
    this.moveX = x;
    this.moveY = y;
  }

  SetSpeedX(x) {
    this.moveX = x;
  }

  SetSpeedY(y) {
    this.moveY = y;
  }

  GetSpeedX() {
    return this.moveX;
  }

  GetSpeedY() {
    return this.moveY;
  }

  Update() {
    this.posX += this.moveX;
    this.posY += this.moveY;
  }

  IsMoving() {
    if (this.moveX === 0 && this.moveY === 0) {
      return false;
    }
    return true;
  }

  //　球のバウンディングボックス
  /**
   * 球の周囲のボックスです。当たり判定をする際に
   * @returns
   */
  GetRect() {
    let rect = [];
    rect.push(this.posX - this.radius); //0 左
    rect.push(this.posX + this.radius); //1 右
    rect.push(this.posY - this.radius); //2　上
    rect.push(this.posY + this.radius); //3 下
    return rect;
  }
}
