import * as React from 'react';
import './styles.scss';
import VideoQueue from '../VideoQueue/VideoQueue';
import firebase from "../../FireBase";
import ReactPlayer from 'react-player';
import VideoControls from '../VideoControls/VideoControls';
import VideoForm from '../VideoForm/VideoForm';
import { connect } from 'react-redux';
import { changePlayerState } from '../../store/actions';

interface MyProps {
    onPlayerState(): void;
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
    private player: { seekTo: (currentPos: number) => void; };
    constructor(props) {
        super(props);
        this.state = {
            scenarios: [
                {
                    src: '',
                    startPosition: 0,
                    soundLevel: 0,
                    duration: 0,
                    index: 0
                }
            ],
            currentVideo: {
                src: '',
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
        value.map((item: { index: number }, index: number) => {
            item.index = index
        });
        this.setState({
            scenarios: value,
            currentVideo: value[0]
        })
    }

    async changeCurrentScenario(item: { src: string; startPosition: number; soundLevel: number; duration: number; index: number; }): Promise<void> {
        await this.setState({
            currentVideo: {
                ...item,
            },
            playerState: {
                playing: true
            }
        });
        await this.player.seekTo(this.state.currentVideo.startPosition);
    }

    turnPlayerOff(): void {
        this.player.seekTo(0);
        this.setState({
            playerState: {
                playing: false,
            }
        })
    }

    turnPlayerOn(): void {
        this.setState({
            playerState: {
                playing: true,
            }
        })
    }
    async turnPlayerNext(): Promise<void> {
        if (this.state.scenarios.length - 1 != this.state.currentVideo.index) {
            await this.setState({
                currentVideo: {
                    ...this.state.scenarios[this.state.currentVideo.index + 1]
                }
            });
        } else {
            await this.setState({
                currentVideo: {
                    ...this.state.scenarios[0]
                }
            });
        }
        await this.player.seekTo(this.state.currentVideo.startPosition);
    }

    async turnPlayerPrev(): Promise<void> {
        if (this.state.currentVideo.index > 0) {
            await this.setState({
                currentVideo: {
                    ...this.state.scenarios[this.state.currentVideo.index - 1]
                }
            });
        } else {
            await this.setState({
                currentVideo: {
                    ...this.state.scenarios[this.state.scenarios.length - 1]
                }
            });

        }
        await this.player.seekTo(this.state.currentVideo.startPosition);
    }
    turnPlayerPause(): void {
        this.setState({
            playerState: {
                playing: false
            }
        })
    }

    formHandler(event) {
        event.preventDefault();
        console.log(event);
        this.setState({
            scenarios: [
                ...this.state.scenarios,
                {
                    src: event.target.elements[0].value ? event.target.elements[0].value : './src/videos/business.mp4',
                    startPosition: event.target.elements[1].value ? event.target.elements[1].value : 0,
                    soundLevel: event.target.elements[2].value ? event.target.elements[2].value : 0,
                    duration: event.target.elements[3].value ? event.target.elements[3].value : 0,
                    index: this.state.scenarios.length
                }
            ]
        })
    }

    volumeHandler(event) {       
        this.setState({
            currentVideo: {
                ...this.state.currentVideo,
                soundLevel: event.target.value
            }
        })
    }

    async deleteHandler(item: { src: string; startPosition: number; soundLevel: number; duration: number; index: number; }) {
        let scenariosWithoutDeleted = this.state.scenarios.filter(elem => elem != item).map((elem, index) => {
            elem.index = index;
            return elem;
        });
        await this.setState({
            scenarios: scenariosWithoutDeleted
        })
        await this.changeCurrentScenario(this.state.scenarios[0]);
    }

    uploadFile(e: any) {
        // let file = e.target.files[0];
        // let storageRef = firebase.storage().ref('./src/videos/' + file.name);
        // let task = storageRef.put(file);
        // firebase.storage().ref('./src/videos').child(file.name).getDownloadURL().then(
        //     url => {
        //         console.log(url)
        //         this.setState({
        //             currentVideo: {
        //                 ...this.state.currentVideo,
        //                 src: url
        //             }
        //         })
        //     }

        // );

        // task.on('state_changed', function(snap) {
        //     console.log(snap);

        // })
    }

    componentDidMount(): void {
        this.getScenario()
    }

    ref = (player: any) => {
        this.player = player;
    }

    render() {
        return (
            <div className="video-player__grid-list">
                <div className="video-player__grid-item">
                    <div className={`video-player__overlay ${this.state.playerState.playing ? '' : 'active'}`}>
                        <h1 className="article video-player__article">Stopped/Paused</h1>
                    </div>
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
                        deleteHandler={this.deleteHandler.bind(this)}
                        scenarios={this.state.scenarios}
                        current={this.state.currentVideo.index} />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Add scenario</h3>
                    <VideoForm uploadFile={this.uploadFile.bind(this)} formHandler={this.formHandler.bind(this)} index={this.state.scenarios.length} />
                </div>
                <div className="video-player__grid-item">
                    <VideoControls
                        windowParams={this.state.currentVideo}
                        volumeHandler={this.volumeHandler.bind(this)}
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

const mapStateToProps = state => {
    return {
        // favoritesUsers: state.favoritesUsers,
        playerState: state.playerState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlayerState: (user) => dispatch(changePlayerState(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);

// export default VideoPlayer;