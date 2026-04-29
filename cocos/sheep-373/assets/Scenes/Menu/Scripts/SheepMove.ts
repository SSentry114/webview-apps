import { _decorator, Component, Node, tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SheepMove")
export class SheepMove extends Component {
  @property([Node])
  movePoints: Node[] = [];

  start() {
    if (this.movePoints.length > 0) {
      this._moveAlonePath();
    }
  }

  update(deltaTime: number) {
    this.node.setScale(this.node.position.y < 0 ? -0.1 : 0.1, 0.1);
  }

  /**
   * 移动（沿着路径）
   */
  private _moveAlonePath() {
    const points = this.movePoints.map((node) => node.position);
    let currIndex = 0;

    const moveToNextPoint = () => {
      const point = points[currIndex];

      tween(this.node)
        .to(1, { position: point }, { easing: "sineInOut" })
        .call(moveToNextPoint)
        .start();

      currIndex = (currIndex + 1) % points.length;
    };

    moveToNextPoint();
  }
}
