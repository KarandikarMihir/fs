import { useMemo } from 'react'
import map from 'lodash/map'
import last from 'lodash/last'
import find from 'lodash/find'
import Breadcrumbs from 'components/Breadcrumbs'
import Search from 'components/Search'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'
import { useApplicationContext } from 'components/ApplicationContext'
import File from './File'

const getVisibleFolders = (allFolders, id) => {
    const candidate = find(allFolders, (f) => f.meta.id === id)
    if (candidate) {
        return candidate.meta.children
    }

    getVisibleFolders(candidate.meta.children, id)
}

const FilesAndFolders = ({ folders }) => {
    const openCreateModal = () => eventBus.emit(OPEN_MODAL, { type: modalTypes.CREATE_NEW_MODAL })
    const { state } = useApplicationContext()
    const pwd = last(state.pwdPath)
    const visibleFolders = useMemo(() => (pwd ? getVisibleFolders(folders, pwd.meta.id) : folders), [pwd, folders])

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
                <div
                    className="border-dashed self-center m-4 border-4 rounded-2xl border-gray-200 w-[110px] h-[125px] flex items-center justify-center cursor-pointer"
                    onClick={openCreateModal}>
                    <h1 className="text-gray-300 font-bold">{'+'}</h1>
                </div>
            </div>
        </>
    )
}

export default FilesAndFolders
