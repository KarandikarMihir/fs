import { v4 as uuidv4 } from 'uuid'
import size from 'lodash/size'
import random from 'lodash/random'

let tree = [
    {
        public: {
            name: 'Songs',
        },
        meta: {
            isDirectory: true,
            children: [],
        },
    },
    {
        public: {
            name: 'Movies',
        },
        meta: {
            isDirectory: true,
            children: [
                {
                    public: {
                        name: 'Inception',
                    },
                    meta: {
                        isDirectory: true,
                        children: [
                            {
                                public: {
                                    name: 'index.html',
                                },
                                meta: {
                                    isDirectory: false,
                                },
                            },
                            {
                                public: {
                                    name: 'index.js',
                                },
                                meta: {
                                    isDirectory: false,
                                },
                            },
                            {
                                public: {
                                    name: 'Assets',
                                },
                                meta: {
                                    isDirectory: true,
                                    children: [],
                                },
                            },
                            {
                                public: {
                                    name: 'Config',
                                },
                                meta: {
                                    isDirectory: true,
                                    children: [],
                                },
                            },
                        ],
                    },
                },
            ],
        },
    },
    {
        public: {
            name: 'Videos',
        },
        meta: {
            isDirectory: true,
            children: [],
        },
    },
    {
        public: {
            name: 'My Test Folder',
        },
        meta: {
            isDirectory: true,
            children: [
                {
                    public: {
                        name: 'Recordings',
                    },
                    meta: {
                        isDirectory: true,
                        children: [],
                    },
                },
                {
                    public: {
                        name: 'Designs',
                    },
                    meta: {
                        isDirectory: true,
                        children: [],
                    },
                },
                {
                    public: {
                        name: 'Projects',
                    },
                    meta: {
                        isDirectory: true,
                        children: [],
                    },
                },
            ],
        },
    },
    {
        public: {
            name: 'Screenshots',
        },
        meta: {
            isDirectory: true,
            children: [],
        },
    },
    {
        public: {
            name: 'index.html',
        },
        meta: {
            isDirectory: false,
        },
    },
]

const authorNames = ['Harvey Specter', 'Jessica Pearson', 'Louis Litt', 'Mike Ross']

const assignIds = (tree, parentId) => {
    if (!size(tree)) {
        return
    }

    tree.forEach((element) => {
        const id = uuidv4()
        element.meta.id = id
        element.meta.parentId = parentId
        element.public['Creator Name'] = authorNames[random(0, 3)]
        element.public['Created Date'] = '6th June, 2020'
        element.public.size = `${random(100, 999)}kb`
        assignIds(element.meta.children, id)
    })
}

assignIds(tree, null)

console.log(tree)

export default tree
