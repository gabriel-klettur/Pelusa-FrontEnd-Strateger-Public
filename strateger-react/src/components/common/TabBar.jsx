
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { getTabClassName } from '../NavBar/utils/helpers';

const NavBar = ({selectedTab, handleTabChange, tabs}) => {
    return(
        <TabGroup vertical selectedIndex={selectedTab} onChange={handleTabChange}>
            <div className="flex">
            <TabList className="w-12 h-auto mt-1">
                {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    className={({ selected }) =>
                        `w-full h-14 p-2 text-sm font-medium transition-colors duration-200 ${getTabClassName({ selected, disabled: tab.disabled })}`
                    }
                    disabled={tab.disabled}
                >
                    <img
                        src={tab.icon}
                        alt={tab.name}
                        className={`h-8 w-8 mx-auto ${tab.disabled ? 'opacity-50' : ''}`}
                    />
                </Tab>
                ))}
            </TabList>
            </div>
        </TabGroup>
    );
}

export default NavBar;