import { v4 as uuidv4 } from 'uuid'
import size from 'lodash/size'

export const softDeleteFile = (tree, id) => {
    if (!size(tree)) {
        return tree
    }

    for (let index = 0; index < tree.length; index++) {
        if (tree[index].meta.id === id) {
            tree[index].meta.isDeleted = true
            break
        }
        if (tree[index].meta.isDirectory) {
            softDeleteFile(tree[index].meta.children, id)
        }
    }

    return tree
}

const __createNewFile = (details) => {
    const newFile = {}
    const id = uuidv4()
    newFile.meta = {
        id,
        parentId: details.parentId ?? null,
        isDirectory: details.isDirectory,
    }

    newFile.public = {
        name: details.Name,
        'Creator Name': details.Creator,
        'Created Date': details.Date,
        size: details.Size,
    }

    if (details.isDirectory) {
        newFile.meta.children = []
    }

    return newFile
}

export const createFile = (tree, payload) => {
    if (!size(tree)) {
        return tree
    }

    if (!payload.parentId) {
        const newFile = __createNewFile(payload)
        tree.push(newFile)
        return tree
    }

    for (let index = 0; index < tree.length; index++) {
        if (tree[index].meta.id === payload.parentId) {
            const newFile = __createNewFile(payload)
            tree[index].meta.children.push(newFile)
            break
        }

        if (tree[index].meta.isDirectory) {
            createFile(tree[index].meta.children, payload)
        }
    }

    return tree
}
