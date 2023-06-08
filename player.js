class Player {
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
}
