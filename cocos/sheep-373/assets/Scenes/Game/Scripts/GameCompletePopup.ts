import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameCompletePopup")
export class GameCompletePopup extends Component {
  @property(Node)
  /** 重新开始按钮节点 */
  public restartBtnNode: Node;

  @property(Node)
  /** 下一关按钮节点 */
  public nextBtnNode: Node;

  /** 是否完成 */
  public isCompleted: boolean = false;

  protected onEnable(): void {
    this.restartBtnNode.active = !this.isCompleted;
    this.nextBtnNode.active = this.isCompleted;
  }
}
