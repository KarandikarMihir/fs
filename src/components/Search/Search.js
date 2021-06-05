const Search = () => {
    return (
        <div>
            <div className="w-[300px] px-4 py-1 relative border border-gray-300 rounded-lg">
                <input type="text" placeholder="Search for anything" className="ml-6 outline-none" />
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
