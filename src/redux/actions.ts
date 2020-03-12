import * as actionTypes from "./actionTypes";
import firebase from "../FireBase";

export const changePlayerState = (playerState: boolean) => {
    return {
        type: actionTypes.CHANGE_PLAYER_STATE,
        payload: {
            playerState
        }
    }
}

export const setPlayerZeroPos = (playerState: boolean) => {
    return {
        type: actionTypes.SET_PLAYER_ZERO_POS,
        payload: {
            playerState
        }
    }
}

export const setScenarios = (scenarios: object[]) => {
    return {
        type: actionTypes.SET_SCENARIOS,
        payload: {
            scenarios
        }
    }
}

export const setCurrentVideo = (scenario: object) => {
    return {
        type: actionTypes.SET_CURRENT_VIDEO,
        payload: {
            scenario
        }
    }
}

export const setVolumeLevel = (volume: number) => {
    return {
        type: actionTypes.SET_VOLUME_LEVEL,
        payload: {
            volume
        },
        meta: {
            throttle: 50
        }
    }
}

export const changeScenarioStep = (scenario: object) => {
    return {
        type: actionTypes.CHANGE_SCENARIO_STEP,
        payload: {
            scenario
        }
    }
}

export const changeLoadState = (loadState: boolean) => {
    return {
        type: actionTypes.CHANGE_LOAD_STATE,
        payload: {
            loadState
        }
    }
}

export const asyncGetScenarios = () => {
    return async dispatch => {
        const dbRef = await firebase.database().ref().once('value');
        const value = await dbRef.val().items;
        value.map((item: any, index: number) => {
            item.index = index;
            const video = document.createElement('video');
            video.src = item.src;
            video.addEventListener('loadedmetadata', () => {
                item.duration = Math.round(video.duration);
                dispatch({
                    type: actionTypes.GET_SCENARIOS_ASYNC,
                    payload: {
                        scenarios: value
                    }
                });
                dispatch({
                    type: actionTypes.SET_CURRENT_VIDEO,
                    payload: {
                        scenario: value[0]
                    }
                });
                dispatch({
                    type: actionTypes.CHANGE_LOAD_STATE,
                    payload: {
                        loadState: true
                    }
                });
            });
        });
        
    }
}




