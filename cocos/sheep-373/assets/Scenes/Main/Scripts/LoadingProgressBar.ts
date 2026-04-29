import { _decorator, Component, Label, ProgressBar } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadingProgressBar")
export class LoadingProgressBar extends Component {
  @property(Label)
  /** 进度条值标签 */
  public progressBarValueLabel: Label;

  /** 进度条组件 */
  private _progressBarComp: ProgressBar;

  /** 是否游戏启动完成  */
  private _isGameLaunched: boolean = false;

  /** 加载速度 */
  private _loadingSpeed: number = 1;

  /** 当前等待时间 */
  private _currWaitTime: number = 0;

  /** 当前移动长度 */
  private get _currLength() {
    const value = this._loadingSpeed * this._currWaitTime;

    return value < 1 ? value : 1;
  }

  protected onLoad(): void {
    this._progressBarComp = this.node.getComponent(ProgressBar);
  }

  protected onEnable(): void {
    this._isGameLaunched = false;
    this._currWaitTime = 0;
    this._updateProgressBar();
    this._updateProgressBarValueLabel();
  }

  protected update(dt: number): void {
    if (this._isGameLaunched) {
      return;
    }

    // 更新当前等待时间
    this._currWaitTime += dt;

    if (this._currLength >= 1) {
      return;
    }

    this._updateProgressBar();
    this._updateProgressBarValueLabel();
  }

  /**
   * 更新进度条
   */
  private _updateProgressBar() {
    this._progressBarComp.progress = this._currLength;
  }

  /**
   * 更新进度条值标签
   */
  private _updateProgressBarValueLabel() {
    this.progressBarValueLabel.string = (this._currLength * 100).toFixed(0);
  }
}
