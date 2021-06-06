import Navigation from 'components/Navigation'
import FilesAndFolders from 'components/FilesAndFolders'
import ContextMenu from 'components/ContextMenu'
import FileInfoModal from 'components/FileInfoModal'
import CreateNewModal from 'components/CreateNewModal/CreateNewModal'
import ApplicationContextProvider from 'components/ApplicationContext'
import tree from './data'

const App = () => {
    return (
        <ApplicationContextProvider>
            <div className="flex h-screen">
                <div className="bg-gray-100 min-w-[300px]">
                    <Navigation folders={tree} />
                </div>
                <div className="flex-1 px-12 py-8">
                    <FilesAndFolders folders={tree} />
                </div>
                <ContextMenu />
                <FileInfoModal />
                <CreateNewModal />
            </div>
        </ApplicationContextProvider>
    )
}

export default App
