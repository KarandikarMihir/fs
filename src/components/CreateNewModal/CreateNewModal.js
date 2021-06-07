import { useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import map from 'lodash/map'
import last from 'lodash/last'
import some from 'lodash/some'
import Modal from 'components/Modal'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'
import useMountEffect from 'hooks/useMountEffect'
import { useApplicationContext } from 'components/ApplicationContext'

const SegmentedControl = ({ isDirectory, setIsDirectory }) => {
    const commonClassname = 'flex-1 text-center p-2'
    const fileClassName = cx(commonClassname, 'rounded-l-lg border', {
        'bg-[#4AB7FF] text-white  border-[#4AB7FF]': !isDirectory,
        'border-gray-200': isDirectory,
    })
    const folderClassName = cx(commonClassname, 'rounded-r-lg border', {
        'bg-[#4AB7FF] text-white  border-[#4AB7FF]': isDirectory,
        'border-gray-200': !isDirectory,
    })

    return (
        <div className="flex w-1/2 mx-auto my-5 cursor-pointer">
            <div className={fileClassName} onClick={() => setIsDirectory(false)}>
                File
            </div>
            <div className={folderClassName} onClick={() => setIsDirectory(true)}>
                Folder
            </div>
        </div>
    )
}

const Input = ({ name, onChange, value }) => {
    return (
        <input
            type="text"
            className="border border-gray-200 rounded-lg w-full px-4 py-2 mb-4 outline-none"
            placeholder={name}
            name={name}
            onChange={onChange}
            value={value || ''}
        />
    )
}

const Button = ({ onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-[#4AB7FF] text-white p-3 my-5 rounded-lg active:bg-[#007fd3] disabled:opacity-50"
            disabled={disabled}>
            Create
        </button>
    )
}

const ALL_FIELDS = ['Name', 'Creator', 'Size', 'Date']
const initialState = ALL_FIELDS.reduce((acc, curr) => {
    acc[curr] = ''
    return acc
}, {})

const CreateNewModal = () => {
    const [isDirectory, setIsDirectory] = useState(false)
    const [fields, setFieldData] = useState(initialState)
    const [isVisible, setVisibility] = useState(false)
    const { state, actions } = useApplicationContext()
    const hasEmptyField = some(fields, (f) => !f)

    useMountEffect(() => {
        const open = (payload) => {
            setIsDirectory(false)
            setFieldData(initialState)
            if (payload.type === modalTypes.CREATE_NEW_MODAL) {
                setVisibility(true)
            } else {
                setVisibility(false)
            }
        }

        eventBus.on(OPEN_MODAL, open)

        return () => eventBus.off(OPEN_MODAL, open)
    })

    if (!isVisible) {
        return null
    }

    const handleOnChange = (e) => setFieldData({ ...fields, [e.target.name]: e.target.value })
    const handleOnSubmit = () => {
        actions.createFile({
            ...fields,
            isDirectory,
            parentId: last(state.pwdPath)?.meta?.id,
        })
    }

    return createPortal(
        <Modal title="Create New" onClose={() => setVisibility(false)}>
            <SegmentedControl isDirectory={isDirectory} setIsDirectory={setIsDirectory} />
            <div className="mt-5 px-5">
                {map(ALL_FIELDS, (f) => (
                    <Input key={f} name={f} onChange={handleOnChange} value={fields[f]} />
                ))}
                <Button onClick={handleOnSubmit} disabled={hasEmptyField} />
            </div>
        </Modal>,
        document.getElementById('app-modal-container'),
    )
}

export default CreateNewModal
