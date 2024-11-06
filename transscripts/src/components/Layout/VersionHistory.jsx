// src/components/Layout2/VersionHistory.jsx
import React from 'react';

const VersionHistory = () => {
  const history = [
    { version: '1.0', date: '2024-10-10', note: 'Initial draft' },
    { version: '1.1', date: '2024-10-15', note: 'Added meeting notes' },
    { version: '2.0', date: '2024-10-20', note: 'Design revisions' },
  ];

  return (
    <div className="flex flex-col space-y-2 p-4">
      {history.map((item, index) => (
        <div key={index} className="p-4 bg-primary-black rounded-lg text-off-white">
          <div className="font-semibold">Version {item.version}</div>
          <div className="text-gray-500 text-sm">{item.date}</div>
          <p>{item.note}</p>
        </div>
      ))}
    </div>
  );
};

export default VersionHistory;
