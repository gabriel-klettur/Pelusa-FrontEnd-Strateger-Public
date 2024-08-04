import React, { useState } from 'react';

const CollapsibleSection = ({ title, count, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="collapsible-section mb-1">
            <button
                onClick={toggleSection}
                aria-expanded={isOpen}
                className="bg-blue-500 text-white py-1 px-4 rounded-md w-full text-left"
            >
                {title} {count !== undefined && `(${count})`}
            </button>
            {isOpen && (
                <div className="mt-2 p-4 border border-gray-300 rounded-md">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;
