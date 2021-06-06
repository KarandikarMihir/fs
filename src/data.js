const tree = [
    {
        name: 'Songs',
        isDirectory: true,
        children: [],
    },
    {
        name: 'Movies',
        isDirectory: true,
        children: [
            {
                name: 'Inception',
                isDirectory: true,
                children: [
                    {
                        name: 'index.html',
                        isDirectory: false,
                    },
                    {
                        name: 'index.js',
                        isDirectory: false,
                    },
                    {
                        name: 'Assets',
                        isDirectory: true,
                        children: [],
                    },
                    {
                        name: 'Config',
                        isDirectory: true,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        name: 'Videos',
        isDirectory: true,
        children: [],
    },
    {
        name: 'My Test Folder',
        isDirectory: true,
        children: [
            {
                name: 'Recordings',
                isDirectory: true,
                children: [],
            },
            {
                name: 'Designs',
                isDirectory: true,
                children: [],
            },
            {
                name: 'Projects',
                isDirectory: true,
                children: [],
            },
        ],
    },
    {
        name: 'Screenshots',
        isDirectory: true,
        children: [],
    },
    {
        name: 'index.html',
        isDirectory: false,
    },
]

export default tree
