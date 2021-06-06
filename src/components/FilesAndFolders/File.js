import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import eventBus, { OPEN_CONTEXT_MENU } from 'eventBus'

const File = ({ name, size, creatorName, createdDate, isDirectory }) => {
    const ref = useRef()
    const [isSelected, setSelected] = useState(false)
    const icon = isDirectory ? 'folder' : 'file'
    const className = cx(
        'w-[120px] flex items-center justify-center m-4 py-4 px-2 flex-col rounded-xl cursor-pointer transition-all',
        {
            'bg-[#E6F5FF]': isSelected,
        },
    )

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setSelected(false)
            }
        }

        window.document.addEventListener('click', handleClick)

        return () => window.document.removeEventListener('click', handleClick)
    })

    return (
        <div
            ref={ref}
            className={className}
            onClick={() => setSelected(true)}
            title={name}
            onContextMenu={(e) => {
                e.preventDefault()
                eventBus.emit(OPEN_CONTEXT_MENU, { x: e.clientX, y: e.clientY })
                setSelected(true)
            }}>
            <img
                src={`/icons/${icon}.png`}
                alt="file-icon"
                className={cx({ 'w-[70px]': isDirectory, 'w-[45px]': !isDirectory }, 'inline')}
            />
            <p className="w-full text-center truncate mt-3">{name}</p>
        </div>
    )
}

export default File
