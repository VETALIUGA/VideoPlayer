import * as actionTypes from './actions';

const initialState = {
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_PLAYER_STATE:
            console.log(state);

        // const newUserState = [...state.favoritesUsers];
        // if (newUserState.find((user) => user.id != action.value.id)) {
        //     newUserState.push(action.value);
        // }
        // return {
        //     ...state,
        //     favoritesUsers: newUserState,
        // };
    }
    return state;
}

export default reducer;