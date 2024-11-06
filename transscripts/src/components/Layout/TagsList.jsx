// src/components/Layout2/TagsList.jsx
import React from 'react';

const TagsList = () => {
  const tags = [
    'Meeting Notes',
    'Important',
    'Design',
    'Review Needed',
    'Final Version',
  ];

  return (
    <div className="flex flex-col space-y-2 p-4">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-primary-black text-neon-yellow px-4 py-2 rounded-full text-center"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagsList;
