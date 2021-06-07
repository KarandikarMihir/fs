import map from 'lodash/map'
import last from 'lodash/last'
import filter from 'lodash/filter'
import trim from 'lodash/trim'
import includes from 'lodash/includes'
import toLower from 'lodash/toLower'
import Breadcrumbs from 'components/Breadcrumbs'
import Search from 'components/Search'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'
import { useApplicationContext } from 'components/ApplicationContext'
import File from './File'

const FilesAndFolders = () => {
    const openCreateNewModal = () => eventBus.emit(OPEN_MODAL, { type: modalTypes.CREATE_NEW_MODAL })
    const { state } = useApplicationContext()
    const pwd = last(state.pwdPath)
    const searchKey = trim(state.searchKey)
    const visibleFolders = filter(pwd ? pwd.meta.children : state.tree, (x) => {
        if (x.meta.isDeleted) {
            return false
        }
        return includes(toLower(x.public.name), toLower(searchKey))
    })

    return (
        <>
            <div className="flex justify-between">
                <Breadcrumbs />
                <Search />
            </div>
            <div className="flex flex-wrap items-end mt-8">
                {map(visibleFolders, (f, index) => (
                    <File key={index} attributes={f} />
                ))}
                {!searchKey && (
                    <div
                        className="border-dashed self-center m-4 border-4 rounded-2xl border-gray-200 w-[110px] h-[125px] flex items-center justify-center cursor-pointer"
                        onClick={openCreateNewModal}>
                        <h1 className="text-gray-300 font-bold">{'+'}</h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default FilesAndFolders
