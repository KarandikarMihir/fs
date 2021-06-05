const Modal = ({ title, onClose, children }) => {
    return (
        <div className="fixed left-[40%] top-[20%] bg-white p-8 z-50 rounded-lg border border-gray-100 shadow-lg w-[450px]">
            <img
                src="/icons/close.svg"
                alt="close"
                className="right-[30px] top-[30px] absolute cursor-pointer"
                onClick={onClose}
            />
            <p className="text-2xl text-center">{title}</p>
            {children}
        </div>
    )
}

export default Modal
