import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import map from 'lodash/map'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'
import Modal from 'components/Modal'
import { useApplicationContext } from 'components/ApplicationContext'

const LineItem = ({ label, value }) => {
    return (
        <div className="flex my-2">
            <div className="flex-1">
                <p className="text-xl text-right">{label}:</p>
            </div>
            <div className="pl-2 flex-1">
                <p className="text-xl text-gray-400">{value}</p>
            </div>
        </div>
    )
}

const FileInfoModal = () => {
    const [isVisible, setVisibility] = useState(false)
    const { state } = useApplicationContext()

    useEffect(() => {
        const open = (payload) => {
            if (payload.type === modalTypes.FILE_INFO_MODAL) {
                setVisibility(true)
            } else {
                setVisibility(false)
            }
        }

        eventBus.on(OPEN_MODAL, open)

        return () => eventBus.off(OPEN_MODAL, open)
    }, [])

    if (!isVisible) {
        return null
    }

    const icon = state.selectedFile.isDirectory ? 'folder' : 'file'

    return createPortal(
        <Modal title="File Info" onClose={() => setVisibility(false)}>
            <p className="text-center py-8">
                <img src={`/icons/${icon}.png`} alt="file" className="inline" />
            </p>
            {map(state.selectedFile, (value, key) => (
                <LineItem key={key} value={value} label={key} />
            ))}
        </Modal>,
        document.getElementById('app-modal-container'),
    )
}

export default FileInfoModal
