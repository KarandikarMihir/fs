import { useRef, useState } from 'react'
import map from 'lodash/map'
import cx from 'classnames'
import { createPortal } from 'react-dom'
import eventBus, { OPEN_MODAL, OPEN_CONTEXT_MENU, modalTypes } from 'eventBus'
import { useApplicationContext } from 'components/ApplicationContext'
import useMountEffect from 'hooks/useMountEffect'

const ContextMenu = () => {
    const ref = useRef()
    const [isVisible, setVisibility] = useState(false)
    const [coordinates, setCoordinates] = useState()
    const { state, actions } = useApplicationContext()

    useMountEffect(() => {
        const open = (e) => {
            setVisibility(true)
            setCoordinates(e)
        }

        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setVisibility(false)
                setCoordinates()
            }
        }

        eventBus.on(OPEN_CONTEXT_MENU, open)

        window.document.addEventListener('click', handleClick)

        return () => {
            eventBus.off(OPEN_CONTEXT_MENU, open)
            window.document.removeEventListener('click', handleClick)
        }
    })

    const className = cx('fixed w-[150px] bg-white border border-gray-200 rounded-xl shadow-lg z-50', {
        hidden: !isVisible,
    })

    const menuOptions = [
        {
            label: 'Open',
            onClick: (e) => {
                const { selectedFile } = state
                if (selectedFile.meta.isDirectory) {
                    actions.openFolder(state.selectedFile)
                }
            },
        },
        {
            label: 'Get Info',
            onClick: () => {
                eventBus.emit(OPEN_MODAL, {
                    type: modalTypes.FILE_INFO_MODAL,
                })
            },
        },
        {
            label: 'Delete',
            className: 'text-red-500',
            onClick: () => actions.deleteFile(state.selectedFile.meta.id),
        },
    ]

    return createPortal(
        <div ref={ref} className={className} style={{ left: coordinates?.x, top: coordinates?.y }}>
            {map(menuOptions, (a) => {
                if (!state.selectedFile?.meta?.isDirectory && a.label === 'Open') {
                    return null
                }

                return (
                    <p
                        onClick={(e) => {
                            setVisibility(false)
                            a.onClick(e)
                        }}
                        key={a.label}
                        className={cx(
                            a.className,
                            'px-6 py-3 m-0 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl cursor-pointer',
                        )}>
                        {a.label}
                    </p>
                )
            })}
        </div>,
        document.getElementById('context-menu-container'),
    )
}

export default ContextMenu
