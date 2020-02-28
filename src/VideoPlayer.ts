import firebase from "./FireBase";

type second = number;
type path = string;
type percent = number;

interface IScenario {
    delay?: second;
    rewind?: second;
    soundLevel?: percent;
    src?: path;
    duration?: second;
}

export default class VideoPlayer {
    private scenarios: object[];
    private prevRewind: number = 0;
    private prevDuration: number = 0;
    private videoWindow: HTMLVideoElement;
    constructor(src: path, autoplay: boolean, muted: boolean, delay: second, duration: second) {
        this.playerLoader(src, autoplay, muted, delay, duration);
    };
    private playerLoader(src: path, autoplay: boolean, muted: boolean, delay: second, duration: second): Promise<HTMLVideoElement> {
        this.videoWindow = document.createElement('video');
        this.videoWindow.classList.add('video-player');
        this.videoWindow.src = src;
        this.videoWindow.autoplay = autoplay;
        this.videoWindow.muted = muted;
        this.videoWindow.controls = true;
        return new Promise((resolve) => {
            this.videoWindow.addEventListener('canplay', () => {
                setTimeout(() => {
                    document.body.appendChild(this.videoWindow);
                    setTimeout(() => {
                        resolve(this.videoWindow);
                    }, duration * 1000);
                }, delay * 1000);
            })
        });
    }
    private doScenario(tasks: IScenario) {
        return new Promise((resolve) => {
            console.log('<----------------- Start of scenario iteration ----------------->');
            console.log(tasks.delay ? `Delay before scenario iteration will start: ${tasks.delay} sec.` : 'Delay value is empty');
            setTimeout(() => {

                if (this.videoWindow.src.split('/').slice(-1).join('/') != tasks.src.split('/').slice(-1).join('/')) {
                    this.videoWindow.src = tasks.src;
                    console.log(
                        'Change video source and',
                        `move to: ${this.videoWindow.currentTime = tasks.rewind} sec.`
                    );
                } else {
                    console.log(
                        'Video source has the same value, no need to replace.',
                        `move to: ${this.videoWindow.currentTime = tasks.delay + tasks.rewind + this.prevRewind + this.prevDuration} sec.`
                    );
                }
                this.prevRewind = tasks.rewind;
                this.prevDuration = tasks.duration;
                if (tasks.soundLevel != undefined) {
                    console.log(`Setting volume level to ${this.videoWindow.volume = tasks.soundLevel / 100} / 1.0`);
                } else {
                    console.log('Volume level is empty');
                }

                setTimeout(() => {
                    resolve();
                    console.log('<----------------- End of scenario iteration ----------------->');
                }, tasks.duration * 1000);
            }, tasks.delay * 1000);
        });
    };
    private async getScenario() {
        let dbRef = await firebase.database().ref().once('value');
        let value = await dbRef.val().items;
        this.scenarios = value;
        console.log('Scenarios were received: ', this.scenarios);
        // let response = await fetch('http://localhost:8080/src/scenarios.json');
        // let json = await response.json();
        // this.scenarios = json.items;
        // console.log('this scenarios: ', this.scenarios);
    }

    public async doScenarios() {
        await this.getScenario();
        let scenarioPromises: Promise<unknown> = null;
        this.scenarios.map((item, i) => {
            scenarioPromises = scenarioPromises || this.doScenario(this.scenarios[i]);
            scenarioPromises = scenarioPromises.then(() => this.doScenario(this.scenarios[i++]))
        })
        scenarioPromises.then(() => {
            console.log(`<----------------- END ----------------->`);
        });
    }

}