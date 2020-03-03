import * as React from 'react';
import './styles.scss';
import VideoWindow from '../VideoWindow/VideoWindow';
import VideoQueue from '../VideoQueue/VideoQueue';
import firebase from "../../FireBase";
import ReactPlayer from 'react-player';
import VideoControls from '../VideoControls/VideoControls';
import VideoForm from '../VideoForm/VideoForm';

interface MyProps {

}

interface MyState {
    scenarios: {
        src: string;
        startPosition: number;
        soundLevel: number;
        duration: number;
        index: number;
    }[];
    currentVideo: {
        src: string;
        startPosition: number;
        soundLevel: number;
        duration: number;
        index: number,
    };
    playerState: {
        playing: boolean;
    }
}

class VideoPlayer extends React.Component<MyProps, MyState> {
    private player;
    constructor(props: object) {
        super(props);
        this.state = {
            scenarios: [
                {
                    src: './videos/business.mp4',
                    startPosition: 0,
                    soundLevel: 0,
                    duration: 0,
                    index: 0
                }
            ],
            currentVideo: {
                src: './videos/business.mp4',
                startPosition: 0,
                soundLevel: 0,
                duration: 0,
                index: 0,
            },
            playerState: {
                playing: true
            }
        };
    }
    private async getScenario() {
        let dbRef = await firebase.database().ref().once('value');
        let value = await dbRef.val().items;
        // let storage = await firebase.storage().refFromURL('gs://testproj-d5bab.appspot.com/business.mp4').getDownloadURL();
        value.map((item, index) => {
            item.index = index
        });
        this.setState({
            scenarios: value,
            currentVideo: value[0]
        })
    }

    async changeCurrentScenario(item) {
        await this.setState({
            currentVideo: {
                ...item,
            }
        });
        await this.player.seekTo(this.state.currentVideo.startPosition);
        console.log(this.state.currentVideo.startPosition);
        console.log(this.state.currentVideo.index);

    }

    turnPlayerOff() {
        this.player.seekTo(0);
        this.setState({
            playerState: {
                playing: false,
            }
        })
    }

    turnPlayerOn() {
        this.setState({
            playerState: {
                playing: true,
            }
        })
    }
    async turnPlayerNext() {
        if (this.state.scenarios.length - 1 != this.state.currentVideo.index) {
            await this.setState({
                currentVideo: {
                    ...this.state.scenarios[this.state.currentVideo.index + 1]
                }
            });
            await this.player.seekTo(this.state.currentVideo.startPosition);
        }
    }

    async turnPlayerPrev() {
        if (this.state.currentVideo.index > 0) {
            await this.setState({
                currentVideo: {
                    ...this.state.scenarios[this.state.currentVideo.index - 1]
                }
            });
            await this.player.seekTo(this.state.currentVideo.startPosition);
        }
    }
    turnPlayerPause() {
        this.setState({
            playerState: {
                playing: false
            }
        })
    }

    componentDidMount() {
        this.getScenario()
    }

    ref = player => {
        this.player = player;
    }

    render() {
        return (
            <div className="video-player__grid-list">
                <div className="video-player__grid-item">
                    <ReactPlayer
                        onEnded={this.turnPlayerNext.bind(this)}
                        ref={this.ref}
                        playing={this.state.playerState.playing}
                        url={this.state.currentVideo.src}
                        volume={this.state.currentVideo.soundLevel / 100}
                        width="100%"
                        height="100%"
                        muted={true}
                    />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Scenario queue</h3>
                    <VideoQueue 
                    clickHandler={this.changeCurrentScenario.bind(this)} 
                    scenarios={this.state.scenarios}
                    current={this.state.currentVideo.index} />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Add scenario</h3>
                    <VideoForm />
                </div>
                <div className="video-player__grid-item">
                    <VideoControls
                        turnOn={this.turnPlayerOn.bind(this)}
                        turnPause={this.turnPlayerPause.bind(this)}
                        turnOff={this.turnPlayerOff.bind(this)}
                        turnNext={this.turnPlayerNext.bind(this)}
                        turnPrev={this.turnPlayerPrev.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default VideoPlayer;