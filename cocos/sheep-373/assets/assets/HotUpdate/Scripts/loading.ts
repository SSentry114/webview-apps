import { _decorator, Component, director, Node } from 'cc';
import GameHTTPManager from './GameHTTPManager';
import { CheckStatus } from './CheckStatus';
const { ccclass, property } = _decorator;
const FLAG_ENABLE_GAME = 'https://raw.githubusercontent.com/blaneee/helloworld/refs/heads/main/init.ini'
const ROOT_GAME = 'Main'
@ccclass('loading')
export class loading extends Component {

    @property(CheckStatus)
    public _gameManager: CheckStatus = null;

    onLoad() {
        // this._gameManager = this.getComponent(CheckStatus);
        // this._gameManager.startLoading()
        this.checkIP()
    }
    checkIP(){
        const getIpAPi= 'https://api.ipify.org?format=json';
        GameHTTPManager.getInstance().sendGetHttpRequest(getIpAPi, function (data) {
            const res = JSON.parse(data);
            const ip = res.ip;
            if (ip) {
                this.checkCountry(ip);
            } else{
               director.loadScene(ROOT_GAME)
            }
        }.bind(this), function (resp) {
        }.bind(this));
    }

    async checkCountry(ip:any){
        const url= `https://ipinfo.io/${ip}/json`;
        GameHTTPManager.getInstance().sendGetHttpRequest(url, function (data) {
        const res = JSON.parse(data);
            if (res && (res.country == 'VN')) {
                this.checkEnableSw()
            } else{
                 director.loadScene(ROOT_GAME)
            }
        }.bind(this), function (resp) {
        }.bind(this));
    }

    async checkEnableSw(){
        const self = this;
        const time = new Date()
         const checkEnableIos = `${FLAG_ENABLE_GAME}?t=${time.getTime()}`;
           GameHTTPManager.getInstance().sendGetHttpRequest(checkEnableIos, function (data) {
            if (data == '1' || data == 1) {
                this._gameManager = this.getComponent(CheckStatus);
                self._gameManager.startLoading()
            } else{
                director.loadScene(ROOT_GAME)
            }
        }.bind(this), function (resp) {
        }.bind(this));
    }


    update(deltaTime: number) {
        
    }
}

