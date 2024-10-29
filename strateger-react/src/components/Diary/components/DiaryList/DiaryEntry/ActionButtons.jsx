const ActionButtons = ({onEdit, onDelete, id}) => {
    return(
        <div className="flex justify-between">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                onClick={() => onEdit(id)}
            >
                Edit
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </div>
    )
}

export default ActionButtons;