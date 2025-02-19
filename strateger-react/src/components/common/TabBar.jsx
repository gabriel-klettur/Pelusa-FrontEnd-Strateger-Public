import { Tab, TabGroup, TabList } from '@headlessui/react';

const NavBar = ({  handleTabChange, tabs }) => {
    return (
        <TabGroup vertical  onChange={handleTabChange}>
            <div className="flex">
                <TabList className="w-12 h-auto">
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            className={({ selected }) => {
                                const baseClasses =
                                    'w-full h-14 p-2 text-sm font-medium transition-colors duration-200';
                                const disabledClasses =
                                    'cursor-not-allowed bg-gray-500 text-gray-500';
                                const selectedClasses =
                                    'bg-african_violet-500 text-african_violet-900';
                                const unselectedClasses =
                                    'bg-african_violet-300 text-african_violet-700 hover:bg-african_violet-300 hover:text-african_violet-900';

                                return `${baseClasses} ${
                                    tab.disabled
                                        ? disabledClasses
                                        : selected
                                        ? selectedClasses
                                        : unselectedClasses
                                }`;
                            }}
                            disabled={tab.disabled}
                        >
                            <img
                                src={tab.icon}
                                alt={tab.name}
                                className={`h-8 w-8 mx-auto ${
                                    tab.disabled ? 'opacity-50' : ''
                                }`}
                            />
                        </Tab>
                    ))}
                </TabList>
            </div>
        </TabGroup>
    );
};

export default NavBar;
