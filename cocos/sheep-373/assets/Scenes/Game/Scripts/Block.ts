import {
  _decorator,
  Animation,
  Component,
  Input,
  UITransform,
  Node,
  CCBoolean,
} from "cc";
import {
  changeBoardEventTarget,
} from "db://assets/Scripts/GlobalEvent";
import {
  AUDIO_EFFECT_ENUM,
  CHANGE_BOARD_EVENT_TYPE_ENUM,
  GAME_EVENT_ENUM,
} from "db://assets/Scripts/GlobalEnum";
const { ccclass, property } = _decorator;

/**
 * 块接口
 */
export interface IBlock {
  /** 唯一标识 */
  id: number;
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number;
  /** 宽 */
  width: number;
  /** 高 */
  height: number;
  /** 类型 */
  type: number;
  /** 覆盖的块标识集合 */
  lowItemIds: Set<number>;
  /** 被覆盖的块标识集合 */
  highItemIds: Set<number>;
}

@ccclass("Block")
export class Block extends Component implements IBlock {
  @property(Node)
  /** 遮罩节点 */
  public maskNode: Node;

  @property(CCBoolean)
  /** 是否为插槽面板块 */
  public readonly isBoardSlotBlock: boolean = false;

  public id: number = 0;
  public type: number = 0;
  public lowItemIds: Set<number> = new Set();
  public highItemIds: Set<number> = new Set();

  /** 是否触碰开始 */
  private _isTouchStart = false;

  /** UI组件 */
  private _uiTransformComp: UITransform;

  /** 动画组件 */
  private _animationComp: Animation;

  private get _touchable() {
    return this.highItemIds.size === 0;
  }

  public get x() {
    return this.node.position.x;
  }

  public get y() {
    return this.node.position.y;
  }

  public set x(value) {
    this.node.setPosition(value, this.node.position.y);
  }

  public set y(value) {
    this.node.setPosition(this.node.position.x, value);
  }

  public get width() {
    return this._uiTransformComp.width;
  }

  public get height() {
    return this._uiTransformComp.height;
  }

  public set width(value) {
    this.getComponent(UITransform).width = value;
  }

  public set height(value) {
    this.getComponent(UITransform).height = value;
  }

  protected onLoad(): void {
    this._uiTransformComp = this.getComponent(UITransform);
    this._animationComp = this.getComponent(Animation);
    this._animationComp.on(
      "finished" as any,
      this._onPlayByAnimationComp,
      this
    );

    this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);

    changeBoardEventTarget.on(
      CHANGE_BOARD_EVENT_TYPE_ENUM.TOUCHABLE,
      this._onChangeBoardTouchable,
      this
    );
    changeBoardEventTarget.on(
      CHANGE_BOARD_EVENT_TYPE_ENUM.DELETE_HIGH_ITEM_ID,
      this._onChangeBoardDeleteHighItemId,
      this
    );

    this.maskNode.active = !this._touchable;
  }

  protected onDestroy(): void {
    this._animationComp.off(
      "finished" as any,
      this._onPlayByAnimationComp,
      this
    );

    this.node.off(Input.EventType.TOUCH_START, this._onTouchStart, this);

    changeBoardEventTarget.off(
      CHANGE_BOARD_EVENT_TYPE_ENUM.TOUCHABLE,
      this._onChangeBoardTouchable
    );
    changeBoardEventTarget.off(
      CHANGE_BOARD_EVENT_TYPE_ENUM.DELETE_HIGH_ITEM_ID,
      this._onChangeBoardDeleteHighItemId
    );
  }

  /**
   * 事件监听，触碰开始
   */
  private _onTouchStart() {
    if (this.isBoardSlotBlock === true) {
      return;
    }

    if (this._touchable === false) {
      return;
    }

    if (this._isTouchStart === true) {
      return;
    }

    this._isTouchStart = true;
    this._animationComp.play();
    changeBoardEventTarget.emit(CHANGE_BOARD_EVENT_TYPE_ENUM.TOUCH_BLOCK, this);
  }

  private _onPlayByAnimationComp() {
    this.node.destroy();
  }

  /**
   * 事件监听，更新棋盘面板，可触碰
   */
  private _onChangeBoardTouchable() {
    this.maskNode.active = !this._touchable;
  }

  /**
   * 事件监听，更新棋盘面板，删除高位项的唯一标识
   * @param id 唯一标识
   * @param highItemId 删除高位项的唯一标识
   */
  private _onChangeBoardDeleteHighItemId(id: number, highItemId: number) {
    if (this.id !== id) {
      return;
    }

    this.highItemIds.delete(highItemId);
    this.maskNode.active = !this._touchable;
  }
}
