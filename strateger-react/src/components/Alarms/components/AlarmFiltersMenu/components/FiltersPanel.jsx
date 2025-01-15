
import FilterSection from './FilterSection';

const FiltersPanel = ({filterSectionsConfig, handleCheckboxChange, handleApply, handleClear}) => {
    
    return(
        <div className="absolute right-0 w-[600px] bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50">

            {filterSectionsConfig.map((section) => (
            <div key={section.title}>
                <FilterSection                
                    title={section.title}
                    items={section.items}
                    onChange={(key) => handleCheckboxChange(section.stateUpdater, key)}
                    gridCols={section.gridCols}
                />
                <hr />          
            </div>
            ))}                      

            {/* ----------------------------------- Apply and Clear buttons ---------------------------------*/}
            <div className="flex justify-between mt-4">
            <button
                onClick={handleApply}
                className="btn btn-apply"
            >
                Apply
            </button>
            <button
                onClick={handleClear}
                className="btn btn-cancel"
            >
                Clear
            </button>
            </div>
        </div>
    )
}

export default FiltersPanel;