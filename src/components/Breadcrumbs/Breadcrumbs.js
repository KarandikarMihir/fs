import { useApplicationContext } from 'components/ApplicationContext'
import cx from 'classnames'
import map from 'lodash/map'
import size from 'lodash/size'

const Breadcrumbs = () => {
    const { state, actions } = useApplicationContext()
    const isRoot = !size(state.pwdPath)
    return (
        <div className="flex items-center">
            <div className={cx('mr-8', { 'opacity-30': isRoot, 'cursor-pointer': !isRoot })}>
                <img src="/icons/arrow.png" alt="arrow" onClick={!isRoot ? actions.closeFolder : null} />
            </div>
            <div className="text-2xl mb-1">
                {!isRoot ? (
                    map(state.pwdPath, (folder) => (
                        <span key={folder.meta.id} className="lowercase">
                            {folder.public.name}
                        </span>
                    ))
                ) : (
                    <span className="lowercase">root</span>
                )}
            </div>
        </div>
    )
}

export default Breadcrumbs
