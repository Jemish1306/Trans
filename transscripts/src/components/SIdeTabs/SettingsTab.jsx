import React, { useState } from 'react';

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    font: 'Ag Text Semibold',
    timestampFrequency: 'Every Speaker',
    playbackSpeed: '1',
    theme: 'Light',
    autosaveFrequency: '5 minutes',
    textSize: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
    // Add logic here to save settings to local storage or a backend server
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">
            Font:
            <select name="font" value={settings.font} onChange={handleChange} className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>Ag Text Semibold</option>
              <option>Other Font 1</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">
            Timestamp Frequency:
            <select name="timestampFrequency" value={settings.timestampFrequency} onChange={handleChange} className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>Every Speaker</option>
              <option>Every Minute</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">
            Playback Speed:
            <select name="playbackSpeed" value={settings.playbackSpeed} onChange={handleChange} className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>0.75</option>
              <option>1</option>
              <option>1.25</option>
              <option>1.5</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">
            Theme:
            <select name="theme" value={settings.theme} onChange={handleChange} className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">
            Autosave Frequency:
            <select name="autosaveFrequency" value={settings.autosaveFrequency} onChange={handleChange} className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">
            Text Size:
            <select name="textSize" value={settings.textSize} onChange={handleChange} className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
