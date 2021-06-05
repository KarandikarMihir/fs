import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Modal from 'components/Modal'
import eventBus, { OPEN_MODAL, modalTypes } from 'eventBus'

const SegmentedControl = () => {
    return (
        <div className="flex w-1/2 mx-auto my-5 cursor-pointer">
            <div className="flex-1 text-center p-2 bg-[#4AB7FF] rounded-l-lg text-white border border-[#4AB7FF]">
                File
            </div>
            <div className="flex-1 text-center p-2 rounded-r-lg border border-gray-200">Folder</div>
        </div>
    )
}

const Input = () => {
    return (
        <input
            type="text"
            className="border border-gray-200 rounded-lg w-full px-4 py-2 mb-4 outline-none"
            placeholder="Name"
        />
    )
}

const Button = () => {
    return <button className="w-full bg-[#4AB7FF] text-white p-3 my-5 rounded-lg">Create</button>
}

const CreateNewModal = () => {
    const [isVisible, setVisibility] = useState(false)
    useEffect(() => {
        const open = (payload) => {
            if (payload.type === modalTypes.CREATE_NEW_MODAL) {
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

    return createPortal(
        <Modal title="Create New" onClose={() => setVisibility(false)}>
            <SegmentedControl />
            <div className="mt-5 px-5">
                <Input />
                <Input />
                <Input />
                <Input />
                <Button />
            </div>
        </Modal>,
        document.getElementById('app-modal-container'),
    )
}

export default CreateNewModal
