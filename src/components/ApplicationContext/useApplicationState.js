import { useReducer, useMemo } from 'react'

const initialState = {
    selectedFile: null,
    pwdPath: [],
}

const SET_SELECTED_FILE = 'SET_SELECTED_FILE'
const OPEN_FOLDER = 'OPEN_FOLDER'
const CLOSE_FOLDER = 'CLOSE_FOLDER'

const reducer = (state, action) => {
    switch (action.type) {
        case SET_SELECTED_FILE: {
            return {
                ...state,
                selectedFile: action.payload,
            }
        }
        case OPEN_FOLDER: {
            const { pwdPath } = state
            pwdPath.push(action.payload)
            console.log('pwdPath', pwdPath)
            return {
                ...state,
                pwdPath,
            }
        }
        case CLOSE_FOLDER: {
            const { pwdPath } = state
            pwdPath.pop()
            return {
                ...state,
                pwdPath,
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
                openFolder: (payload) =>
                    dispatch({
                        type: OPEN_FOLDER,
                        payload,
                    }),
                closeFolder: () =>
                    dispatch({
                        type: CLOSE_FOLDER,
                    }),
            },
        }),
        [state, dispatch],
    )
}

export default useApplicationState
