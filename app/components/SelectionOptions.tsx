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
    <div className="flex flex-col items-start space-y-4 my-4">
      {options.map((option, index) => (
        option.isExternal ? (
          <a
            key={index}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono px-1 py-2 text-stone-400 hover:text-neutral-800 text-xl"
          >
            {option.name}
          </a>
        ) : (
          <Link
            key={index}
            href={option.url}
            className="font-mono px-1 py-2 text-stone-400 hover:text-neutral-800 text-xl"
          >
            {option.name}
          </Link>
        )
      ))}
    </div>
  );
};

export default SelectionOptions;
