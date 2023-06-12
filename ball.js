class Ball {
  constructor() {
    this.pos_x = 320;
    this.pos_y = 675;
    this.radius = 10;
    this.move_x = 0;
    this.move_y = 0;
  }

  Draw(context) {
    context.fillStyle = "white";
    context.beginPath();
    context.arc(this.pos_x, this.pos_y, this.radius, 0, Math.PI * 2, false);
    context.fill();
  }

  SetSpeed(x, y) {
    this.move_x = x;
    this.move_y = y;
  }

  SetSpeedX(x) {
    this.move_x = x;
  }

  SetSpeedY(y) {
    this.move_y = y;
  }

  GetSpeedX() {
    return this.move_x;
  }

  GetSpeedY() {
    return this.move_y;
  }

  Update() {
    this.pos_x += this.move_x;
    this.pos_y += this.move_y;
  }

  IsMoving() {
    if (this.move_x === 0 && this.move_y === 0) {
      return false;
    }
    return true;
  }

  //球のバウンディングボックス
  GetRect() {
    let rect = [];
    rect.push(this.pos_x - this.radius); //0 左
    rect.push(this.pos_x + this.radius); //1 右
    rect.push(this.pos_y - this.radius); //2　上
    rect.push(this.pos_y + this.radius); //3 下
    return rect;
  }
}
