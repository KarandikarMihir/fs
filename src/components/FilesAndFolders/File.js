import { useEffect, useRef, useState } from 'react'
import split from 'lodash/split'
import cx from 'classnames'
import eventBus, { OPEN_CONTEXT_MENU } from 'eventBus'
import { useApplicationContext } from 'components/ApplicationContext'

const File = ({ attributes }) => {
    const ref = useRef()
    const [isSelected, setSelected] = useState(false)
    const { actions } = useApplicationContext()
    const {
        public: { name },
        meta: { isDirectory },
    } = attributes

    const icon = isDirectory ? 'folder' : 'file'
    const className = cx(
        'w-[120px] flex items-center justify-center m-4 py-4 px-2 flex-col rounded-xl cursor-pointer transition-all',
        {
            'bg-[#E6F5FF]': isSelected,
        },
    )

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target) && isSelected) {
                setSelected(false)
            }
        }

        window.document.addEventListener('click', handleClick)

        return () => window.document.removeEventListener('click', handleClick)
    })

    const extension = !isDirectory && split(name, '.')[1]

    const handleOnClick = () => {
        setSelected(true)
        actions.setSelectedFile(attributes)
    }

    return (
        <div
            ref={ref}
            className={className}
            onClick={handleOnClick}
            title={name}
            onContextMenu={(e) => {
                e.preventDefault()
                eventBus.emit(OPEN_CONTEXT_MENU, { x: e.clientX, y: e.clientY })
                handleOnClick()
            }}>
            <div className="relative">
                <img
                    src={`/icons/${icon}.png`}
                    alt="file-icon"
                    className={cx({ 'w-[70px]': isDirectory, 'w-[45px]': !isDirectory }, 'inline')}
                />
                {extension && <span className="absolute text-white bottom-[20px]">{extension}</span>}
            </div>
            <p className="w-full text-center truncate mt-3">{name}</p>
        </div>
    )
}

export default File
