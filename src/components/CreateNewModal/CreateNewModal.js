import { createPortal } from 'react-dom'

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
    return createPortal(
        <div className="fixed left-[40%] top-[20%] bg-white p-8 z-50 rounded-lg border border-gray-100 shadow-lg w-[400px]">
            <img src="/icons/close.svg" alt="close" className="right-[30px] top-[30px] absolute cursor-pointer" />
            <p className="text-2xl text-center">Create New</p>
            <SegmentedControl />
            <div className="mt-5 px-5">
                <Input />
                <Input />
                <Input />
                <Input />
                <Button />
            </div>
        </div>,
        document.getElementById('app-modal-container'),
    )
}

export default CreateNewModal
