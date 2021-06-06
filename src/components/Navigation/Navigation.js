import map from 'lodash/map'
import size from 'lodash/size'
import cx from 'classnames'
import useToggle from 'hooks/useToggle'

const LineItem = ({ item }) => {
    const [isExpanded, toggle] = useToggle()

    return (
        <div className="">
            <div className="px-8 py-3 text-lg flex justify-between items-center hover:bg-gray-200">
                {item.public.name}
                {size(item.meta.children) > 0 && (
                    <img
                        src="/icons/dropdown.svg"
                        alt="dropdown"
                        className={cx('cursor-pointer', {
                            'transform rotate-180': isExpanded,
                        })}
                        onClick={toggle}
                    />
                )}
            </div>
            {isExpanded && (
                <div className="px-8">
                    <div className="border-l-2 border-gray-200">
                        {map(item.meta.children, (c) => (
                            <div key={c.public.name} className="pl-5 py-2 hover:bg-gray-200">
                                {c.public.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const Navigation = ({ folders }) => {
    return (
        <>
            <p className="px-8 pt-8 pb-3 text-sm text-gray-400 uppercase font-bold">root</p>
            {map(folders, (f, index) => (
                <LineItem item={f} key={index} />
            ))}
        </>
    )
}

export default Navigation
