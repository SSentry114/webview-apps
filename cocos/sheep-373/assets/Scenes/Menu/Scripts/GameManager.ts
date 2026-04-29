import {
  _decorator,
  AssetManager,
  assetManager,
  Component,
  director,
  Node,
} from "cc";
import {
  AUDIO_EFFECT_ENUM,
  GAME_EVENT_ENUM,
  GAME_SCENE_ENUM,
} from "db://assets/Scripts/GlobalEnum";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  /**
   * 事件监听，点击游戏开始按钮
   */
  public onClickGameStartBtn() {


    assetManager.loadBundle(
      GAME_SCENE_ENUM.GAME,
      (err, bundle: AssetManager.Bundle) => {
        director.loadScene(GAME_SCENE_ENUM.GAME);
      }
    );
  }
}
