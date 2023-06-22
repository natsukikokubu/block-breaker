/**ゲーム判定をします。ゲームクリアとゲームオーバーの表示。 */
class GameManager {
  static STATE_PLAYING = 0;
  static STATE_GAME_OVER = 1;
  static STATE_GAME_CLEAR = 2;

  constructor() {
    this.state = GameManager.STATE_PLAYING;
  }

  SetGameState(state) {
    this.state = state;
  }

  GetGameState() {
    return this.state;
  }
}
