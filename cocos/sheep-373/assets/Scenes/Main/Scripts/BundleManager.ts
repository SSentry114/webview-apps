import {
  _decorator,
  AssetManager,
  assetManager,
  Component,
  director,
} from "cc";
import { GAME_SCENE_ENUM } from "db://assets/Scripts/GlobalEnum";
const { ccclass, property } = _decorator;

@ccclass("BundleManager")
export class BundleManager extends Component {
  protected start(): void {
    Promise.all([
      new Promise<void>((resolve) => {
        assetManager.loadBundle(
          GAME_SCENE_ENUM.MENU,
          (err, bundle: AssetManager.Bundle) => {
            resolve();
          }
        );
      }),
      new Promise<void>((resolve) => {
        assetManager.loadBundle(
          GAME_SCENE_ENUM.GAME,
          (err, bundle: AssetManager.Bundle) => {
            resolve();
          }
        );
      }),
    ]).then(() => {
      director.loadScene(GAME_SCENE_ENUM.MENU);
    });
  }
}
