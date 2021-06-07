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
                    <FilesAndFolders />
                </div>
                <ContextMenu />
                <FileInfoModal />
                <CreateNewModal />
                <p className="fixed bottom-[10px] right-[20px]">
                    <a href="https://github.com/KarandikarMihir/fs" target="_blank" rel="noreferrer">
                        {'View Source on Github'}
                    </a>
                </p>
            </div>
        </ApplicationContextProvider>
    )
}

export default App
