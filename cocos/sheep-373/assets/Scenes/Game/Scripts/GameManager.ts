import {
  _decorator,
  CCInteger,
  Component,
  director,
  instantiate,
  Label,
  Node,
  Prefab,
  Sprite,
} from "cc";
import { Levels } from "./Levels";
import { IBlock } from "./Block";
import { Utils } from "./Utils";
import {
  changeBoardEventTarget,
} from "db://assets/Scripts/GlobalEvent";
import {
  AUDIO_EFFECT_ENUM,
  CHANGE_BOARD_EVENT_TYPE_ENUM,
  GAME_EVENT_ENUM,
  GAME_SCENE_ENUM,
} from "db://assets/Scripts/GlobalEnum";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Prefab)
  /** 棋盘块预制体 */
  public blockPrefab: Prefab;

  @property(Label)
  /** 关卡标签节点 */
  public levelLabelNode: Label;

  @property(Node)
  /** 棋盘节点 */
  public boardBlockNode: Node;

  @property(Node)
  /** 棋盘插槽节点 */
  public boardSlotNode: Node;

  @property(Node)
  /** 游戏失败弹出框节点 */
  public gameOverPopupNode: Node;

  @property(Node)
  /** 游戏完成弹出框节点 */
  public gameCompletePopupNode: Node;

  @property(CCInteger)
  /** 块宽度 */
  public blockWidth: number;

  @property(CCInteger)
  /** 块高度 */
  public blockHeight: number;

  /** 当前关卡 */
  public level: number = 0;

  /** 棋盘块数据 */
  public blocks: IBlock[] = [];

  /** 棋盘块标识到棋盘块的映射 */
  public idToBlockMap: Map<number, IBlock> = new Map();

  /** 棋盘插槽块数据 */
  public boardSlotBlocks: IBlock[] = [];

  protected onLoad(): void {
    changeBoardEventTarget.on(
      CHANGE_BOARD_EVENT_TYPE_ENUM.TOUCH_BLOCK,
      this._onChangeBoardTouchBlock,
      this
    );

    this.restart();
  }

  protected onDestroy(): void {
    changeBoardEventTarget.off(
      CHANGE_BOARD_EVENT_TYPE_ENUM.TOUCH_BLOCK,
      this._onChangeBoardTouchBlock,
      this
    );
  }

  /**
   * 重新开始
   */
  public restart() {
    this._initLevel();
    this._initBlocks();
    this._loadBoardBlockContent();
    this._initBoardSlotBlocks();
    this._initPopups();
  }

  /**
   * 下一关
   */
  public nextLevel() {
    this.level++;
    this._initLevel();
    this._initBlocks();
    this._loadBoardBlockContent();
    this._initBoardSlotBlocks();
    this._initPopups();
  }

  /**
   * 初始化关卡
   */
  private _initLevel() {
    this.levelLabelNode.string = `第 ${this.level + 1} 关`;
  }

  /**
   * 初始化棋盘块数据
   */
  private _initBlocks() {
    const levelData: {
      blocks: { x: number; y: number }[];
    } = Levels[this.level] || {
      blocks: Utils.generateRandomPoints(700, 1000, 120),
    };
    const length = levelData.blocks.length;
    const blockTypeNum = length / 3 < 14 ? length / 3 : 14;
    const idToBlockMap = new Map();
    const blocks: IBlock[] = levelData.blocks.map((item, index) => {
      const data = {
        ...item,
        id: index,
        width: this.blockWidth,
        height: this.blockHeight,
        type: index % blockTypeNum,
        lowItemIds: new Set<number>(),
        highItemIds: new Set<number>(),
      };

      idToBlockMap.set(index, data);
      return data;
    });

    for (let i = 0; i < length; i++) {
      const currItem = blocks[i];

      // 往底部寻找覆盖的节点
      for (let j = i - 1; j >= 0; j--) {
        const lowItem = blocks[j];

        // 如果存在覆盖关系，建立联系
        if (Utils.isRectangleOverlap(currItem, lowItem)) {
          lowItem.highItemIds.add(currItem.id);
          currItem.lowItemIds.add(lowItem.id);
        }
      }
    }

    this.blocks = blocks;
    this.idToBlockMap = idToBlockMap;
  }

  /**
   * 加载棋盘内容
   */
  private _loadBoardBlockContent() {
    // 清除棋盘旧的 Block Node
    this.boardBlockNode.children.forEach((item) => {
      item.destroy();
    });

    // 初始化新的 Block Node
    this.blocks.forEach((item) => {
      const blockNode = instantiate(this.blockPrefab);
      const blockComp = blockNode.getComponent("Block") as unknown as IBlock;
      const spriteComp = blockNode.getComponent(Sprite);

      blockComp.id = item.id;
      blockComp.x = item.x;
      blockComp.y = item.y;
      blockComp.width = item.width;
      blockComp.height = item.height;
      blockComp.type = item.type;
      blockComp.lowItemIds = item.lowItemIds;
      blockComp.highItemIds = item.highItemIds;
      spriteComp.spriteFrame = spriteComp.spriteAtlas.getSpriteFrame(
        blockComp.type.toString()
      );

      this.boardBlockNode.addChild(blockNode);
    });
  }

  /**
   * 初始化棋盘插槽数据
   */

  private _initBoardSlotBlocks() {
    this.boardSlotBlocks = [];
    this.boardSlotNode.children.forEach((item) => {
      item.active = false;
    });
  }

  /**
   * 初始化弹出框
   */
  private _initPopups() {
    this.gameOverPopupNode.active = false;
    this.gameCompletePopupNode.active = false;
  }

  /**
   * 事件监听，更新棋盘面板，触碰块
   */
  private _onChangeBoardTouchBlock(block) {
    const { id, type } = block;
    const highItem = this.idToBlockMap.get(id);

    // 更新棋盘块覆盖关系
    highItem.lowItemIds.forEach((lowItemId) => {
      const lowItem = this.idToBlockMap.get(lowItemId);
      lowItem.highItemIds.delete(id);
      changeBoardEventTarget.emit(
        CHANGE_BOARD_EVENT_TYPE_ENUM.DELETE_HIGH_ITEM_ID,
        lowItemId,
        id
      );
    });

    // 更新棋盘插槽面板
    let equalsTypeCount = 0;

    this.boardSlotBlocks.forEach((item) => {
      if (item.type === type) {
        equalsTypeCount++;
      }
    });

    // 非消除
    if (equalsTypeCount < 2) {
      this.boardSlotBlocks.push(block);
    }
    // 消除
    else {
      while (equalsTypeCount > 0) {
        const index = this.boardSlotBlocks.findIndex(
          (item) => item.type === type
        );
        this.boardSlotBlocks.splice(index, 1);

        equalsTypeCount--;
      }
    }

    // 更新棋盘插槽节点
    const length = this.boardSlotBlocks.length;

    this.boardSlotNode.children.forEach((item, index) => {
      if (index < length) {
        const spriteComp = item.getComponent(Sprite);
        spriteComp.spriteFrame = spriteComp.spriteAtlas.getSpriteFrame(
          this.boardSlotBlocks[index].type.toString()
        );
        item.active = true;
      } else {
        item.active = false;
      }
    });

    // 判断游戏是否失败
    if (this.boardSlotBlocks.length === 9) {
      this.gameOverPopupNode.active = true;

      console.log("游戏失败");
      return;
    }

    // 判断游戏是否成功
    if (this.boardBlockNode.children.length === 1) {
      const gameCompletePopupComp = this.gameCompletePopupNode.getComponent(
        "GameCompletePopup"
      ) as any;

      gameCompletePopupComp.isCompleted = true;
      this.gameCompletePopupNode.active = true;
  
      console.log("游戏成功");
      return;
    }
  }

  /**
   * 事件监听，点击返回菜单场景按钮
   */
  public onClickBackBtn() {


    director.loadScene(GAME_SCENE_ENUM.MENU);
  }
}
