import { useReducer, useMemo } from 'react'
import dropRight from 'lodash/dropRight'
import concat from 'lodash/concat'
import data from 'data'
import { softDeleteFile, createFile } from './utils'

const getInitialState = (tree) => ({
    tree,
    selectedFile: null,
    pwdPath: [],
    searchKey: '',
})

const SET_SELECTED_FILE = 'SET_SELECTED_FILE'
const SET_PWD = 'SET_PWD'
const OPEN_FOLDER = 'OPEN_FOLDER'
const CLOSE_FOLDER = 'CLOSE_FOLDER'
const DELETE_FILE = 'DELETE_FILE'
const CREATE_FILE = 'CREATE_FILE'
const SET_SEARCH_KEY = 'SET_SEARCH_KEY'

const reducer = (state, action) => {
    switch (action.type) {
        case SET_SELECTED_FILE: {
            return {
                ...state,
                selectedFile: action.payload,
            }
        }
        case SET_PWD: {
            return {
                ...state,
                pwdPath: action.payload,
            }
        }
        case OPEN_FOLDER: {
            const { pwdPath } = state
            return {
                ...state,
                pwdPath: concat(pwdPath, action.payload),
            }
        }
        case CLOSE_FOLDER: {
            const { pwdPath } = state
            return {
                ...state,
                pwdPath: dropRight(pwdPath),
            }
        }
        case DELETE_FILE: {
            return {
                ...state,
                tree: softDeleteFile(state.tree, action.payload),
            }
        }
        case CREATE_FILE: {
            return {
                ...state,
                tree: createFile(state.tree, action.payload),
            }
        }
        case SET_SEARCH_KEY: {
            return {
                ...state,
                searchKey: action.payload,
            }
        }
        default: {
            return state
        }
    }
}

const useApplicationState = () => {
    const [state, dispatch] = useReducer(reducer, getInitialState(data))

    return useMemo(
        () => ({
            state,
            actions: {
                setSelectedFile: (payload) =>
                    dispatch({
                        type: SET_SELECTED_FILE,
                        payload,
                    }),
                setPwd: (payload) =>
                    dispatch({
                        type: SET_PWD,
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
                deleteFile: (payload) =>
                    dispatch({
                        type: DELETE_FILE,
                        payload,
                    }),
                createFile: (payload) =>
                    dispatch({
                        type: CREATE_FILE,
                        payload,
                    }),
                setSearchKey: (payload) =>
                    dispatch({
                        type: SET_SEARCH_KEY,
                        payload,
                    }),
            },
        }),
        [state, dispatch],
    )
}

export default useApplicationState
