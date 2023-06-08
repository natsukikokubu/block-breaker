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
  Update() {
    this.pos_x += this.move_x;
    this.pos_y += this.move_y;
  }

  IsMoving() {
    if (this.move_x == 0 && this.move_y == 0) {
      return false;
    }
    return true;
  }

  GetRect() {
    let rect = [];
  }
}
