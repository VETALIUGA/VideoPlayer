import * as actionTypes from "./actionTypes";

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


