import { createPortal } from 'react-dom'

const FileInfoModal = () => {
    return createPortal(
        <div className="fixed left-[40%] top-[20%] bg-white p-8 z-50 rounded-lg border border-gray-100 shadow-lg w-[450px]">
            <img src="/icons/close.svg" alt="close" className="right-[30px] top-[30px] absolute cursor-pointer" />
            <p className="text-2xl text-center">File Info</p>
            <p className="text-center py-8">
                <img src="/icons/file.png" alt="file" className="inline" />
            </p>
            <div className="flex my-2">
                <div className="flex-1">
                    <p className="text-xl text-right">Name:</p>
                </div>
                <div className="pl-2 flex-1">
                    <p className="text-xl text-gray-400">index.html</p>
                </div>
            </div>
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
        </div>,
        document.getElementById('app-modal-container'),
    )
}

export default FileInfoModal
