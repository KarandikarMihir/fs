import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import map from 'lodash/map'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'
import Modal from 'components/Modal'

const LineItem = () => {
    return (
        <div className="flex my-2">
            <div className="flex-1">
                <p className="text-xl text-right">Name:</p>
            </div>
            <div className="pl-2 flex-1">
                <p className="text-xl text-gray-400">index.html</p>
            </div>
        </div>
    )
}

const FileInfoModal = () => {
    const [isVisible, setVisibility] = useState(false)
    const [lineItems, setLineItems] = useState()

    useEffect(() => {
        const open = (payload) => {
            if (payload.type === modalTypes.FILE_INFO_MODAL) {
                setVisibility(true)
                setLineItems(payload)
            } else {
                setVisibility(false)
                setLineItems()
            }
        }

        eventBus.on(OPEN_MODAL, open)

        return () => eventBus.off(OPEN_MODAL, open)
    }, [])

    if (!isVisible) {
        return null
    }

    return createPortal(
        <Modal title="File Info" onClose={() => setVisibility(false)}>
            <p className="text-center py-8">
                <img src="/icons/file.png" alt="file" className="inline" />
            </p>
            {map(lineItems, (item) => (
                <LineItem {...item} />
            ))}
            <div className="flex my-2">
                <div className="flex-1">
                    <p className="text-xl text-right">Size:</p>
                </div>
                <div className="pl-2 flex-1">
                    <p className="text-xl text-gray-400">542kb</p>
                </div>
            </div>
            <div className="flex my-2">
                <div className="flex-1">
                    <p className="text-xl text-right">Creator name:</p>
                </div>
                <div className="pl-2 flex-1">
                    <p className="text-xl text-gray-400">Mihir</p>
                </div>
            </div>
            <div className="flex my-2">
                <div className="flex-1">
                    <p className="text-xl text-right">Created date:</p>
                </div>
                <div className="pl-2 flex-1">
                    <p className="text-xl text-gray-400">24th Aug, 2018</p>
                </div>
            </div>
        </Modal>,
        document.getElementById('app-modal-container'),
    )
}

export default FileInfoModal
