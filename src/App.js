import Navigation from 'components/Navigation'
import FilesAndFolders from 'components/FilesAndFolders'
import tree from './data'

const App = () => {
    return (
        <div className="flex h-screen">
            <div className="bg-gray-100 min-w-[300px]">
                <Navigation folders={tree} />
            </div>
            <div className="flex-1 p-8">
                <FilesAndFolders />
            </div>
        </div>
    )
}

export default App
