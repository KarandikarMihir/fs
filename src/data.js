const tree = [
    {
        label: 'Songs',
        isDirectory: true,
        children: [],
    },
    {
        label: 'Movies',
        isDirectory: true,
        children: [
            {
                label: 'Inception',
                isDirectory: true,
                children: [
                    {
                        label: 'index.html',
                        isDirectory: false,
                    },
                    {
                        label: 'index.js',
                        isDirectory: false,
                    },
                    {
                        label: 'Assets',
                        isDirectory: true,
                        children: [],
                    },
                    {
                        label: 'Config',
                        isDirectory: true,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        label: 'Videos',
        isDirectory: true,
        children: [],
    },
    {
        label: 'My Test Folder',
        isDirectory: true,
        children: [
            {
                label: 'Recordings',
                isDirectory: true,
                children: [],
            },
            {
                label: 'Designs',
                isDirectory: true,
                children: [],
            },
            {
                label: 'Projects',
                isDirectory: true,
                children: [],
            },
        ],
    },
    {
        label: 'Screenshots',
        isDirectory: true,
        children: [],
    },
]

export default tree
