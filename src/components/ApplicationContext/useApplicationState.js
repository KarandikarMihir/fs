import { useReducer, useMemo } from 'react'

const initialState = {
    selectedFile: null,
}

const SET_SELECTED_FILE = 'SET_SELECTED_FILE'

const reducer = (state, action) => {
    switch (action.type) {
        case SET_SELECTED_FILE: {
            return {
                ...state,
                selectedFile: action.payload,
            }
        }
        default: {
            return state
        }
    }
}

const useApplicationState = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return useMemo(
        () => ({
            state,
            actions: {
                setSelectedFile: (payload) =>
                    dispatch({
                        type: SET_SELECTED_FILE,
                        payload,
                    }),
            },
        }),
        [state, dispatch],
    )
}

export default useApplicationState
