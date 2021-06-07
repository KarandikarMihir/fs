import { useReducer, useMemo } from 'react'
import dropRight from 'lodash/dropRight'
import concat from 'lodash/concat'
import size from 'lodash/size'
import data from 'data'

const getInitialState = (tree) => ({
    tree,
    selectedFile: null,
    pwdPath: [],
})

const SET_SELECTED_FILE = 'SET_SELECTED_FILE'
const OPEN_FOLDER = 'OPEN_FOLDER'
const CLOSE_FOLDER = 'CLOSE_FOLDER'
const DELETE_FILE = 'DELETE_FILE'

const softDeleteFile = (tree, id) => {
    if (!size(tree)) {
        return tree
    }

    for (let index = 0; index < tree.length; index++) {
        if (tree[index].meta.id === id) {
            tree[index].meta.isDeleted = true
        }
        if (tree[index].meta.isDirectory) {
            softDeleteFile(tree[index].meta.children, id)
        }
    }

    return tree
}

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
            },
        }),
        [state, dispatch],
    )
}

export default useApplicationState
