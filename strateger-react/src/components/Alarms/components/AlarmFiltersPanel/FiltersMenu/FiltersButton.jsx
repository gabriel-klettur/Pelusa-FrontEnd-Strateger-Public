import FilterIcon from '../../../assets/filter_icon.svg';

const FiltersButton = ({setIsOpen}) => {
    return(
        <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 flex items-center space-x-2 text-white rounded-sm hover:bg-african_violet-400"
      >
        <img
          src={FilterIcon}
          alt="filter icon"          
          className="w-6 h-6 text-african_violet-200 brightness-200"
        />
        <span>Filters</span>
      </button>
    )


};

export default FiltersButton;