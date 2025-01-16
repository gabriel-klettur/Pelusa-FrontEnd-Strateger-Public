const ActionButton = ({ onClick, text, className = "", ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-sm transition-colors duration-200 ${className}`}
            {...props}
        >
            {text}
        </button>
    );
};

export default ActionButton;
