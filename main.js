const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 800;

let canvas = document.getElementById("screen");
let context = canvas.getContext("2d");
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

//-------------------------------------------------------
//プレイヤーの描画
//-------------------------------------------------------

let player = new Player();

//-------------------------------------------------------
//球の描画
//-------------------------------------------------------
let ball = new Ball();

//-------------------------------------------------------
//ブロックの描画
//-------------------------------------------------------
let blocks = Block.GenerateBlocks(3);

//-------------------------------------------------------
//タイマー作成
//-------------------------------------------------------
let frame_count = 0;
let timer_func = function OnTimer16ms() {
  ball.Update();

  context.fillStyle = "black";
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  player.Draw(context);

  ball.Draw(context);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].Draw(context);
  }

  //console.debug("frame_count = " + frame_count);
  frame_count++;
};
setInterval(timer_func, 16);
//-------------------------------------------------------
//マウスボタン押下
//-------------------------------------------------------
let point_x = 0;
function OnMouseDown(event) {
  let is_hit = player.HitTestPoint(event.clientX, event.clientY);
  if (is_hit == true) {
    player.SetGrab(true);
    point_x = event.clientX;
  }
}

//-------------------------------------------------------
//マウス移動
//-------------------------------------------------------
function OnMouseMove(event) {
  if (player.IsGrabbed() == true) {
    let move_x = event.clientX - point_x;
    player.Move(move_x);
    point_x = event.clientX;

    if (ball.IsMoving() == false) {
      if (move_x > 0) {
        ball.SetSpeed(5, -5);
      } else if (move_x < 0) {
        ball.SetSpeed(-5, -5);
      }
    }
  }
}

//-------------------------------------------------------
//マウスボタン解放
//-------------------------------------------------------
function OnMouseUp() {
  player.SetGrab(false);
}

//-------------------------------------------------------
//キー解放
//-------------------------------------------------------
function OnKeyUp(event) {
  console.debug("onkeyup");
}
