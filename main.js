const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 800;

let ball_speed = 5;
let canvas;
let context;

let game_manager;
let bg;
let player;
let blocks;

InitScreen();
CreateInstance();
setInterval(OnTimer16ms, 16);

function InitScreen() {
  canvas = document.getElementById("screen");
  context = canvas.getContext("2d");
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
}

function CreateInstance() {
  //-------------------------------------------------------
  //ゲームマネージャーの生成
  //-------------------------------------------------------
  game_manager = new GameManager();

  //-------------------------------------------------------
  //背景の生成
  //-------------------------------------------------------
  bg = new Background();

  //-------------------------------------------------------
  //プレイヤーの描画
  //-------------------------------------------------------

  player = new Player();

  //-------------------------------------------------------
  //球の描画
  //-------------------------------------------------------
  ball = new Ball();

  //-------------------------------------------------------
  //ブロックの描画
  //-------------------------------------------------------
  blocks = Block.GenerateBlocks(3);
}

//-------------------------------------------------------
//描画作成
//-------------------------------------------------------
function Draw() {
  bg.Draw(context);

  player.Draw(context);

  ball.Draw(context);

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].IsAlive() == true) {
      blocks[i].Draw(context);
    }
  }
  if (game_manager.GetGameState() == GameManager.STATE_GAME_CLEAR) {
    context.font = "48px Arial";
    context.fillStyle = "#ffffff";
    context.fillText("Game Clear", 200, 400);

    ball.SetSpeed(0, 0);
  }

  if (game_manager.GetGameState() == GameManager.STATE_GAME_OVER) {
    context.font = "48px Arial";
    context.fillStyle = "#ff0000";
    context.fillText("Game Over", 200, 400);

    ball.SetSpeed(0, 0);
  }
}

//-------------------------------------------------------
//背景との当たり判定作成
//-------------------------------------------------------
function CollisionWithBg(rect) {
  let hit = bg.Collision(rect[0], rect[1], rect[2], rect[3]);
  if (hit === Background.HIT_LEFT) {
    ball.SetSpeedX(ball_speed);
  } else if (hit === Background.HIT_RIGHT) {
    ball.SetSpeedX(-ball_speed);
  } else if (hit === Background.HIT_TOP) {
    ball.SetSpeedY(ball_speed);
  } else if (hit === Background.HIT_BOTTOM) {
    ball.SetSpeedY(-ball_speed);
    game_manager.SetGameState(GameManager.STATE_GAME_OVER);
  }
}

//-------------------------------------------------------
//プレイヤーとの当たり判定作成
//-------------------------------------------------------
function CollisionWithPlayer(rect) {
  if (ball.GetSpeedX() != 0) {
    let hit = player.Collision(rect[0], rect[1], rect[2], rect[3]);
    if (hit == Player.HIT_LEFT) {
      ball.SetSpeedX(-ball_speed);
    } else if (hit == Player.HIT_RIGHT) {
      ball.SetSpeedX(ball_speed);
    } else if (hit == Player.HIT_TOP) {
      ball.SetSpeedY(-ball_speed);
    } else if (hit == Player.HIT_BOTTOM) {
      ball.SetSpeedY(ball_speed);
    }
  }
}

//-------------------------------------------------------
//ブロックとの当たり判定作成
//-------------------------------------------------------
function CollisionWithBlocks(rect) {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].IsAlive() == true) {
      hit = blocks[i].Collision(rect[0], rect[1], rect[2], rect[3]);
      if (hit != Block.HIT_NON) {
        blocks[i].SetAlive(false);
      }
      if (hit == Block.HIT_LEFT) {
        ball.SetSpeedX(-ball_speed);
      } else if (hit == Block.HIT_RIGHT) {
        ball.SetSpeedX(ball_speed);
      } else if (hit == Block.HIT_TOP) {
        ball.SetSpeedY(-ball_speed);
      } else if (hit == Block.HIT_BOTTOM) {
        ball.SetSpeedY(ball_speed);
      }
    }
  }
}

//-------------------------------------------------------
//ゲームクリア判定作成
//-------------------------------------------------------
function CheckGameClear() {
  let is_game_clear = true;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].IsAlive() == true) {
      is_game_clear = false;
      break;
    }
  }

  if (is_game_clear == true) {
    game_manager.SetGameState(GameManager.STATE_GAME_CLEAR);
  }
}

//-------------------------------------------------------
//タイマー作成
//-------------------------------------------------------
function OnTimer16ms() {
  ball.Update();

  let rect = ball.GetRect();
  CollisionWithBg(rect);

  CollisionWithPlayer(rect);

  CollisionWithBlocks(rect);

  CheckGameClear();

  Draw();
}

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
  if (player.IsGrabbed()) {
    let moveX = event.clientX - point_x;
    player.Move(moveX);
    point_x = event.clientX;
    const isMovingRight = moveX > 0;
    const isMovingLeft = moveX < 0;

    if (!ball.IsMoving()) {
      if (isMovingRight) {
        ball.SetSpeed(ball_speed, -ball_speed);
      } else if (isMovingLeft) {
        ball.SetSpeed(-ball_speed, -ball_speed);
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
  if (event.code == "Escape") {
    CreateInstance();
  }
}
