const ClearButton = ({handleClear}) => {
    return(
        <button
            type="button"
            className="bg-african_violet-400 hover:bg-african_violet-300 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
            onClick={handleClear}
        >
            Clear Entry
      </button>
    )
}

export default ClearButton;