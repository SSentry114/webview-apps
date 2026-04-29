/**
 * 游戏事件枚举
 */
export enum GAME_EVENT_ENUM {
  /** 播放音频事件 */
  PLAY_AUDIO = "PLAY_AUDIO",
  /** 游戏检测清除事件 */
  CHECK_CLEAR = "CHECK_CLEAR",
  /** 游戏检测失败事件 */
  CHECK_LOSED = "CHECK_LOSED",
  /** 游戏检测完成事件 */
  CHECK_COMPLETE = "CHECK_COMPLETE",
  /** 更新棋盘面板事件 */
  CHANGE_BOARD = "CHANGE_BOARD",
  /** 播放爆炸特效事件 */
  PLAY_BOOM = "PLAY_BOOM",
}

/**
 * 音效枚举
 */
export enum AUDIO_EFFECT_ENUM {
  /** 点击按钮 */
  CLICK_BUTTON = "CLICK_BUTTON",
  /** 清除 */
  CLEAR = "CLEAR",
  /** 点击块 */
  CLICK_BLOCK = "CLICK_BLOCK",
  /** 输了 */
  LOSE = "LOSE",
  /** 赢了 */
  WIN = "WIN",
}

/**
 * 更新棋盘面板事件类型枚举
 */
export enum CHANGE_BOARD_EVENT_TYPE_ENUM {
  /** 触碰块 */
  TOUCH_BLOCK,
  /** 可触碰 */
  TOUCHABLE,
  /** 删除高位块的覆盖 */
  DELETE_HIGH_ITEM_ID,
}

/**
 * 游戏场景枚举
 */
export enum GAME_SCENE_ENUM {
  /** 菜单场景 */
  MENU = "Menu",
  /** 游戏场景 */
  GAME = "Game",
}

/**
 * 游戏状态枚举
 */
export enum GAME_STATUS_ENUM {
  /** 初始化 */
  INIT,
  /** 运行中 */
  RUNNING,
  /** 清除 */
  CLEAR,
  /** 失败 */
  LOSED,
  /** 完成 */
  COMPLETE,
}

/**
 * 各区块
 */
export enum GAME_BOARD_ENUM {
  /** 层级 */
  LEVEL = "LEVEL",
  /** 扩展区 */
  LEVEL_EXTEND = "LEVEL_EXTEND",
  /** 随机左侧 */
  RANDOM_LEFT = "RANDOM_LEFT",
  /** 随机右侧 */
  RANDOM_RIGHT = "RANDOM_RIGHT",
  /** 插槽 */
  SLOT = "SLOT",
  /** 隐藏 */
  HIDE = "HIDE",
}
