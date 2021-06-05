import useToggle from 'hooks/useToggle'
import cx from 'classnames'

const File = ({ label, isDirectory, setCoordinates }) => {
    const [isSelected, toggle, setSelected] = useToggle()
    const icon = isDirectory ? 'folder' : 'file'
    const className = cx(
        'w-[120px] flex items-center justify-center flex-col mr-6 my-6 p-4 rounded-xl cursor-pointer',
        {
            'bg-[#E6F5FF]': isSelected,
        },
    )
    return (
        <div
            className={className}
            onClick={toggle}
            onContextMenu={(e) => {
                e.preventDefault()
                setSelected(true)
                setCoordinates({ x: e.clientX, y: e.clientY })
            }}>
            <img src={`/icons/${icon}.png`} alt="file-icon" className="w-[70px] inline" />
            <p className="w-full text-center truncate mt-3" title={label}>
                {label}
            </p>
        </div>
    )
}

export default File
