import { useState } from 'react'
import Navigation from 'components/Navigation'
import FilesAndFolders from 'components/FilesAndFolders'
import ContextMenu from 'components/ContextMenu'
import FileInfoModal from 'components/FileInfoModal'
import CreateNewModal from 'components/CreateNewModal/CreateNewModal'
import tree from './data'

const App = () => {
    const [coordinates, setCoordinates] = useState()
    return (
        <div className="flex h-screen">
            <div className="bg-gray-100 min-w-[300px]">
                <Navigation folders={tree} />
            </div>
            <div className="flex-1 px-12 py-8">
                <FilesAndFolders folders={tree} setCoordinates={setCoordinates} />
            </div>
            <ContextMenu coordinates={coordinates} />
            <FileInfoModal />
            {/* <CreateNewModal /> */}
        </div>
    )
}

export default App
