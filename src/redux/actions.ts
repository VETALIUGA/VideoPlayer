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

export const addNewScenario = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: actionTypes.ADD_NEW_SCENARIO,
            payload: {
                state
            }
        })
    }
    // return {
    //     type: actionTypes.ADD_NEW_SCENARIO,
    //     payload: {
    //         scenario
    //     }
    // } 
}

export const asyncGetScenarios = () => {
    return dispatch => {
        firebase.database().ref().once('value')
            .then(dbRef => dbRef.val().items)
            .then(scenarios => {
                scenarios.map((item: any, index: number) => {
                    item.index = index;
                    const video = document.createElement('video');
                    video.src = item.src;
                    video.addEventListener('loadedmetadata', () => {
                        item.duration = Math.round(video.duration);
                        dispatch({
                            type: actionTypes.GET_SCENARIOS_ASYNC,
                            payload: {
                                scenarios: scenarios
                            }
                        });
                        if (scenarios.length - 1 == index) {

                            dispatch({
                                type: actionTypes.SET_CURRENT_VIDEO,
                                payload: {
                                    scenario: scenarios[0]
                                }
                            });
                            dispatch({
                                type: actionTypes.CHANGE_LOAD_STATE,
                                payload: {
                                    loadState: true
                                }
                            });
                        }
                    });
                });
            })
            .catch(() => console.log('error'));
    }
}




