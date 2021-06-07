import { Fragment } from 'react'
import { useApplicationContext } from 'components/ApplicationContext'
import cx from 'classnames'
import map from 'lodash/map'
import size from 'lodash/size'
import last from 'lodash/last'

const Breadcrumbs = () => {
    const { state, actions } = useApplicationContext()
    const isRoot = !size(state.pwdPath)
    const currentFolder = last(state.pwdPath)

    return (
        <div className="flex items-center">
            <div className={cx('mr-8', { 'opacity-30': isRoot, 'cursor-pointer': !isRoot })}>
                <img src="/icons/arrow.png" alt="arrow" onClick={!isRoot ? actions.closeFolder : null} />
            </div>
            <div className="text-2xl mb-1">
                <span className={cx('lowercase', { 'text-gray-400': !isRoot })}>root</span>
                {map(state.pwdPath, (folder) => (
                    <Fragment key={folder.meta.id}>
                        <span className="text-gray-400">{' / '}</span>
                        <span
                            className={cx('lowercase', {
                                'text-gray-400': currentFolder?.meta?.id !== folder.meta.id,
                            })}>
                            {folder.public.name}
                        </span>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default Breadcrumbs
