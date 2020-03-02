import * as React from 'react';
import './styles.scss';
import VideoWindow from '../VideoWindow/VideoWindow';
import VideoQueue from '../VideoQueue/VideoQueue';
import firebase from "../../FireBase";

interface MyProps {

}

interface MyState {
    scenarios: {
        src: string;
        startPosition: number;
        soundLevel: number;
        duration: number;
    }[];
    currentVideo: {
        src: string;
        startPosition: number;
        soundLevel: number;
        duration: number;
    };
    playerState: {
        playing: boolean,
    }
}

class VideoPlayer extends React.Component<MyProps, MyState> {
    constructor(props: object) {
        super(props);
        this.state = {
            scenarios: [
                {
                    src: './videos/business.mp4',
                    startPosition: 0,
                    soundLevel: 0,
                    duration: 0,
                }
            ],
            currentVideo: {
                src: './videos/business.mp4',
                startPosition: 0,
                soundLevel: 0,
                duration: 0,
            },
            playerState: {
                playing: true,
            }
        };
        // this.changeCurrentScenario = this.changeCurrentScenario;
    }
    private async getScenario() {
        let dbRef = await firebase.database().ref().once('value');
        let value = await dbRef.val().items;
        let storage = await firebase.storage().refFromURL('gs://testproj-d5bab.appspot.com/business.mp4').getDownloadURL();
        console.log(await storage);
        
        this.setState({
            scenarios: value,
            currentVideo: value[0]
        })
    }

    changeCurrentScenario(item) {
        console.log(item);
        
        
        this.setState({
            currentVideo: item
        })
    }

    turnPlayerOn() {
        
             
    }

    componentDidMount() {
        this.getScenario()
    }
    render() {
        return (
            <div className="video-player__grid-list">
                <div className="video-player__grid-item">
                    <VideoWindow src={this.state.currentVideo.src} />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Scenario queue</h3>
                    <VideoQueue clickHandler={this.changeCurrentScenario.bind(this)} scenarios={this.state.scenarios} />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Add scenario</h3>
                    {/* <VideoForm /> */}
                </div>
                <div className="video-player__grid-item">
                    <div className="video-player__controls">
                        <button onClick={this.turnPlayerOn} className="button video-player__button">Play</button>
                        <button className="button video-player__button">Stop</button>
                        <button className="button video-player__button">Pause</button>
                        <button className="button video-player__button">Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;