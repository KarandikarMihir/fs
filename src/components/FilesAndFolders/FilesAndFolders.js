import map from 'lodash/map'
import Breadcrumbs from 'components/Breadcrumbs'
import Search from 'components/Search'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'
import File from './File'

const FilesAndFolders = ({ folders }) => {
    const openCreateModal = () => eventBus.emit(OPEN_MODAL, { type: modalTypes.CREATE_NEW_MODAL })
    return (
        <>
            <div className="flex justify-between">
                <Breadcrumbs />
                <Search />
            </div>
            <div className="flex flex-wrap items-center mt-8">
                {map(folders, (f, index) => (
                    <File key={index} {...f} />
                ))}
                <div
                    className="border-dashed border-4 m-6 rounded-2xl border-gray-200 w-[110px] h-[125px] flex items-center justify-center cursor-pointer"
                    onClick={openCreateModal}>
                    <h1 className="text-gray-300 font-bold">{'+'}</h1>
                </div>
            </div>
        </>
    )
}

export default FilesAndFolders
