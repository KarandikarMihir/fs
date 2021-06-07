import debounce from 'lodash/debounce'
import { useApplicationContext } from 'components/ApplicationContext'

const Search = () => {
    const { actions } = useApplicationContext()

    const update = debounce((value) => actions.setSearchKey(value), 500)
    const handleOnChange = (e) => {
        update(e.target.value)
    }

    return (
        <div>
            <div className="w-[300px] px-4 py-1 relative border border-gray-300 rounded-lg">
                <input
                    type="text"
                    placeholder="Search for anything"
                    className="pl-6 outline-none w-full"
                    onChange={handleOnChange}
                />
                <img
                    src="/icons/search.svg"
                    className="absolute left-[10px] top-[6px] h-[20px] opacity-50"
                    alt="search"
                />
            </div>
        </div>
    )
}

export default Search
