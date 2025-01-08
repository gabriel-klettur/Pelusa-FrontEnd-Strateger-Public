export const getTabClassName = ({ selected, disabled }) => {
    if (disabled) {
        return 'cursor-not-allowed bg-gray-500 text-gray-500';
    }
    return `hover:bg-african_violet-300 ${
        selected
            ? 'bg-african_violet-400 text-african_violet-900'
            : 'bg-african_violet-200 text-african_violet-700 hover:text-african_violet-900'
    }`;
};