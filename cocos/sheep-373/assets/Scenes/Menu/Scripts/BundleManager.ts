import {
  _decorator,
  AssetManager,
  assetManager,
  Component,
  director,
  Node,
} from "cc";
import { GAME_SCENE_ENUM } from "db://assets/Scripts/GlobalEnum";
const { ccclass, property } = _decorator;

@ccclass("BundleManager")
export class BundleManager extends Component {
  protected onLoad(): void {
    assetManager.loadBundle(
      GAME_SCENE_ENUM.MENU,
      (err, bundle: AssetManager.Bundle) => {
        director.preloadScene(GAME_SCENE_ENUM.GAME);
      }
    );
  }
}
