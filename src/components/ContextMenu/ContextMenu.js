import { useEffect, useRef } from 'react'
import map from 'lodash/map'
import cx from 'classnames'
import { createPortal } from 'react-dom'
import useToggle from 'hooks/useToggle'

const ACTIONS = ['Open', 'Get Info', 'Delete']

const ContextMenu = ({ coordinates }) => {
    const ref = useRef()
    const [isVisible, toggle] = useToggle()

    useEffect(() => {
        const clickListener = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                toggle()
            }
        }
        window.document.addEventListener('click', clickListener)

        return () => {
            window.document.removeEventListener('click', clickListener)
        }
    }, [toggle])

    useEffect(() => {
        toggle()
    }, [coordinates, toggle])

    const className = cx('fixed w-[150px] bg-white border border-gray-200 rounded-xl shadow-lg z-50', {
        hidden: !isVisible,
    })

    return createPortal(
        <div ref={ref} className={className} style={{ left: coordinates?.x, top: coordinates?.y }}>
            {map(ACTIONS, (a) => (
                <p
                    key={a}
                    className="px-6 py-3 m-0 hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl cursor-pointer">
                    {a}
                </p>
            ))}
        </div>,
        document.getElementById('context-menu-container'),
    )
}

export default ContextMenu
