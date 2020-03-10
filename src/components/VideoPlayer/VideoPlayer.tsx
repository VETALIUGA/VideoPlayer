import * as React from 'react';
import './styles.scss';
import VideoQueue from '../VideoQueue/VideoQueue';
import firebase from "../../FireBase";
import ReactPlayer from 'react-player';
import VideoControls from '../VideoControls/VideoControls';
import VideoForm from '../VideoForm/VideoForm';
import { connect } from 'react-redux';
import { changePlayerState, setPlayerZeroPos, setScenarios, setCurrentVideo, setVolumeLevel, changeScenarioStep, changeLoadState } from '../../redux/actions';


interface MyProps {
    onPlayerState(currentState: boolean);
    onPlayerStop(currentState: boolean);
    onScenariosSet(scenarios: object[]);
    onCurrentVideoSet(scenario: object);
    onVolumeLevelSet(volume: number);
    onScenarioStepChange(scenario: object);
    onLoadStateChange(loadState: boolean);
    playerState: {
        playing: boolean;
        loaded: boolean;
    };
    scenarios: ScenarioItem[];
    currentVideo: {
        src: string;
        startPosition: number;
        soundLevel: number;
        duration: number;
        index: number,
    }
}

interface ScenarioItem {
    src: string;
    startPosition: number;
    soundLevel: number;
    duration: number;
    index: number;
}

class VideoPlayer extends React.Component<MyProps> {
    private player: { seekTo: (currentPos: number) => void; };
    constructor(props) {
        super(props);
    }
    private async getScenario() {
        let dbRef = await firebase.database().ref().once('value');
        let value = await dbRef.val().items;
        value.map((item: { index: number }, index: number) => {
            item.index = index
        });
        this.props.onScenariosSet(value);
        this.props.onCurrentVideoSet(this.props.scenarios[0]);
        await this.props.onLoadStateChange(true)
    }

    async changeCurrentScenario(item): Promise<void> {
        await this.props.onCurrentVideoSet(item);
        await this.props.onPlayerState(false);
        await this.player.seekTo(this.props.currentVideo.startPosition);
    }

    turnPlayerOff(): void {
        this.player.seekTo(0);
        this.props.onPlayerStop(this.props.playerState.playing);
    }
    async turnPlayerNext(): Promise<void> {
        if (this.props.scenarios.length - 1 != this.props.currentVideo.index) {
            await this.props.onScenarioStepChange(this.props.scenarios[this.props.currentVideo.index + 1]);
            await this.player.seekTo(this.props.currentVideo.startPosition);
        }

    }

    async turnPlayerPrev(): Promise<void> {
        if (this.props.currentVideo.index > 0) {
            await this.props.onScenarioStepChange(this.props.scenarios[this.props.currentVideo.index - 1]);
            await this.player.seekTo(this.props.currentVideo.startPosition);
        }
    }
    togglePlayerState(): void {
        this.props.onPlayerState(this.props.playerState.playing);
    }

    formHandler(data) {
        console.log(data);
        // this.setState({
        //     scenarios: [
        //         ...this.state.scenarios,
        //         {
        //             src: event.target.elements[0].value ? event.target.elements[0].value : './src/videos/business.mp4',
        //             startPosition: event.target.elements[1].value ? event.target.elements[1].value : 0,
        //             soundLevel: event.target.elements[2].value ? event.target.elements[2].value : 0,
        //             duration: event.target.elements[3].value ? event.target.elements[3].value : 0,
        //             index: this.state.scenarios.length
        //         }
        //     ]
        // })
    }

    volumeHandler(value) {
        this.props.onVolumeLevelSet(value);
    }

    async deleteHandler(item: ScenarioItem) {
        let scenariosWithoutDeleted = this.props.scenarios.filter(elem => elem != item).map((elem: ScenarioItem, index) => {
            elem.index = index;
            return elem;
        });
        await this.props.onScenariosSet(scenariosWithoutDeleted);
        await this.changeCurrentScenario(this.props.scenarios[0]);
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
        this.getScenario();
        
    }

    ref = (player: any) => {
        this.player = player;
    }

    render() {
        return (
            <div className="video-player__grid-list">
                <div className="video-player__grid-item">
                    <div className={`video-player__overlay ${this.props.playerState ? '' : 'active'}`}>
                        <h1 className="article video-player__article">Stopped/Paused</h1>
                    </div>
                    <ReactPlayer
                        onEnded={this.turnPlayerNext.bind(this)}
                        ref={this.ref}
                        playing={this.props.playerState.playing}
                        url={this.props.currentVideo.src}
                        volume={this.props.currentVideo.soundLevel / 100}
                        width="100%"
                        height="100%"
                        muted={true}
                    />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Scenario queue</h3>
                    <VideoQueue
                        isLoading={this.props.playerState.loaded}
                        clickHandler={this.changeCurrentScenario.bind(this)}
                        deleteHandler={this.deleteHandler.bind(this)}
                        scenarios={this.props.scenarios}
                        current={this.props.currentVideo.index}
                    />
                </div>
                <div className="video-player__grid-item">
                    <h3 className="video-player__article">Add scenario</h3>
                    <VideoForm
                        // uploadFile={this.uploadFile.bind(this)}
                        onSubmit={this.formHandler}
                        // index={this.props.scenarios.length}
                    />
                </div>
                <div className="video-player__grid-item">
                    <VideoControls
                        windowParams={this.props.currentVideo}
                        volumeHandler={this.volumeHandler.bind(this)}
                        turnOn={this.togglePlayerState.bind(this)}
                        turnPause={this.togglePlayerState.bind(this)}
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
        scenarios: state.player.scenarios,
        playerState: state.player.playerState,
        currentVideo: state.player.currentVideo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlayerState: (playing: boolean) => dispatch(changePlayerState(playing)),
        onPlayerStop: (playing: boolean) => dispatch(setPlayerZeroPos(playing)),
        onScenariosSet: (scenariosArr: object[]) => dispatch(setScenarios(scenariosArr)),
        onCurrentVideoSet: (scenario: object) => dispatch(setCurrentVideo(scenario)),
        onVolumeLevelSet: (volume: number) => dispatch(setVolumeLevel(volume)),
        onScenarioStepChange: (scenario: object) => dispatch(changeScenarioStep(scenario)),
        onLoadStateChange: (loadState: boolean) => dispatch(changeLoadState(loadState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
