import * as actionTypes from "../actionTypes";

const initialState = {
  scenarios: [

  ],
  currentVideo: {
    src: 'string',
    startPosition: 0,
    soundLevel: 0,
    duration: 0,
    index: 0
  },
  playerState: {
    playing: true,
    loaded: false
  }
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.CHANGE_PLAYER_STATE: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          playing: !action.payload.playerState
        }
      };
    }
    case actionTypes.SET_PLAYER_ZERO_POS: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          playing: false
        }
      };
    }
    case actionTypes.SET_SCENARIOS: {
      return {
        ...state,
        scenarios: action.payload.scenarios
      };
    }
    case actionTypes.SET_CURRENT_VIDEO: {
      return {
        ...state,
        currentVideo: action.payload.scenario
      };
    }
    case actionTypes.SET_VOLUME_LEVEL: {
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          soundLevel: action.payload.volume
        }
      };
    }
    case actionTypes.CHANGE_SCENARIO_STEP: {
      return {
        ...state,
        currentVideo: {
          ...action.payload.scenario
        }
      };
    }
    case actionTypes.CHANGE_LOAD_STATE: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          loaded: action.payload.loadState
        }
      };
    }
    case actionTypes.GET_SCENARIOS_ASYNC: {
      return {
        ...state,
        scenarios: action.payload.scenarios
      };
    }
    default:
      return state;
  }
}
