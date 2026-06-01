"use client";

import React from 'react';
import Link from 'next/link';

const SelectionOptions: React.FC = () => {
    const options = [
        { name: 'Project', url: '/project', isExternal: false },
        { name: 'Blog', url: '/blog', isExternal: false },
        { name: 'Photo', url: 'http://photo.soupeed.com', isExternal: true }
    ];

    return (
        <nav className="flex flex-col gap-1">
            {options.map((option, index) => (
                option.isExternal ? (
                    <a
                        key={index}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#6b7280] hover:text-[#0a0a0a] transition-colors duration-150 py-1"
                    >
                        {option.name}
                    </a>
                ) : (
                    <Link
                        key={index}
                        href={option.url}
                        className="text-sm font-medium text-[#6b7280] hover:text-[#0a0a0a] transition-colors duration-150 py-1"
                    >
                        {option.name}
                    </Link>
                )
            ))}
        </nav>
    );
};

export default SelectionOptions;
