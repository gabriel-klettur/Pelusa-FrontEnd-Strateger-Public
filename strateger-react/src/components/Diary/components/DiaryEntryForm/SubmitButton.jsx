const SubmitButton = ({entry}) => {
    return(
        <button
            type="submit"
            className={`font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 ${
            entry ? 'bg-orange-500 hover:bg-orange-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
        >
            {entry ? 'Modify Entry' : 'Save Entry'}
        </button>
    )
}

export default SubmitButton;