import React from 'react';

const DetailsTab = () => {
  // Example hardcoded data
  const details = {
    audioLength: '12:30',
    dueTime: new Date().toLocaleString(),
    format: 'MP4',
    researchType: 'Qualitative',
    projectManager: 'John Doe',
    attributes: ['High Quality', 'Urgent'],
    notesToTranscriber: 'Please ensure accuracy with technical terms.'
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Details</h3>
      <div className="mb-3">
        <h4 className="font-semibold">Audio Length</h4>
        <p>{details.audioLength}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold">Due (Local Time)</h4>
        <p>{details.dueTime}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold">Format</h4>
        <p>{details.format}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold">Research Type</h4>
        <p>{details.researchType}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold">Project Manager</h4>
        <p>{details.projectManager}</p>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold">Attributes</h4>
        <ul>
          {details.attributes.map(attribute => <li key={attribute}>{attribute}</li>)}
        </ul>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold">Notes to Transcriber</h4>
        <p>{details.notesToTranscriber}</p>
      </div>
    </div>
  );
};

export default DetailsTab;
