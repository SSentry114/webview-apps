import {
  _decorator,
  AudioClip,
  AudioSource,
  Component,
  Director,
  director,
} from "cc";
import {
  AUDIO_EFFECT_ENUM,
  GAME_EVENT_ENUM,
  GAME_SCENE_ENUM,
} from "db://assets/Scripts/GlobalEnum";
const { ccclass, property } = _decorator;

@ccclass("AudioManager")
export class AudioManager extends Component {
  @property(AudioClip)
  /** 菜单背景音乐 */
  menuBgm: AudioClip;

  @property(AudioClip)
  /** 游戏背景音乐 */
  gameBgm: AudioClip;

  @property(AudioClip)
  /** 点击按钮音效 */
  clickButtonAudio: AudioClip;

  @property(AudioClip)
  /** 清除音效 */
  clearAudio: AudioClip;

  @property(AudioClip)
  /** 点击块音效 */
  clickBlockAudio: AudioClip;

  @property(AudioClip)
  /** 输了音效 */
  loseAudio: AudioClip;

  @property(AudioClip)
  /** 赢了音效 */
  winAudio: AudioClip;

  @property(AudioSource)
  /** 音频源 */
  audioSource: AudioSource = null;

  protected onLoad(): void {
    director.addPersistRootNode(this.node);

    director.on(
      Director.EVENT_AFTER_SCENE_LAUNCH,
      this._onEventAfterSceneLaunch,
      this
    );


  }

  protected onDestroy(): void {
    director.off(
      Director.EVENT_AFTER_SCENE_LAUNCH,
      this._onEventAfterSceneLaunch,
      this
    );

  }

  /**
   * 事件监听，场景启动
   */
  private _onEventAfterSceneLaunch() {
    this.audioSource.stop();

    const currSceneName = director.getScene().name;

    if (currSceneName === GAME_SCENE_ENUM.MENU) {
      this.audioSource.clip = this.menuBgm;
    } else if (currSceneName === GAME_SCENE_ENUM.GAME) {
      this.audioSource.clip = this.gameBgm;
    } else {
      this.audioSource.clip = null;
    }

    if (this.audioSource.clip) {
      this.audioSource.play();
    }
  }

  /**
   * 事件监听，播放音频
   */
  private _onPlayAudio(type: AUDIO_EFFECT_ENUM) {
    let audioClip = null;

    if (type === AUDIO_EFFECT_ENUM.CLICK_BUTTON) {
      audioClip = this.clickButtonAudio;
    } else if (type === AUDIO_EFFECT_ENUM.CLEAR) {
      audioClip = this.clearAudio;
    } else if (type === AUDIO_EFFECT_ENUM.CLICK_BLOCK) {
      audioClip = this.clickBlockAudio;
    } else if (type === AUDIO_EFFECT_ENUM.LOSE) {
      audioClip = this.loseAudio;
    } else if (type === AUDIO_EFFECT_ENUM.WIN) {
      audioClip = this.winAudio;
    }

    if (audioClip) {
      this.audioSource.playOneShot(audioClip);
    }
  }
}
