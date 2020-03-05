export const CHANGE_PLAYER_STATE = 'CHANGE_PLAYER_STATE';

export const changePlayerState = (state) => {
    return {
        type: CHANGE_PLAYER_STATE,
        value: state,
    }
}