// src/components/Layout/ContextMenu.jsx
import React from 'react';
import {
  FaPlay, FaLink, FaDownload, FaFileExport, FaBold, FaItalic, FaUnderline,
  FaStrikethrough, FaHighlighter, FaCopy, FaCut, FaTrash,
} from 'react-icons/fa';

const ContextMenu = ({ x, y }) => {
  const iconClasses = "flex items-center justify-center w-6 h-6 rounded-full bg-black text-textcolor"; // Common classes for all icons

  return (
    <div
      className="fixed z-50 bg-contextmenu text-black p-4 rounded-lg shadow-lg"
      style={{ top: y, left: x }}
    >
      <ul className="space-y-3">
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaPlay /></span>
          <span>Play (from :49)</span>
          <span className="ml-auto text-gray-500">TAB</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaLink /></span>
          <span>Share Clip (from :49)</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaDownload /></span>
          <span>Download Section</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaFileExport /></span>
          <span>Export to new File</span>
        </li>

        <hr className="border-gray-500" />

        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaBold /></span>
          <span>Bold Text</span>
          <span className="ml-auto text-gray-500">CMD + B</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaItalic /></span>
          <span>Italicize Text</span>
          <span className="ml-auto text-gray-500">CMD + I</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaUnderline /></span>
          <span>Underline Text</span>
          <span className="ml-auto text-gray-500">CMD + U</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaStrikethrough /></span>
          <span>Strikethrough Text</span>
          <span className="ml-auto text-gray-500">CMD + SHIFT + X</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaHighlighter /></span>
          <span>Highlight Text</span>
        </li>

        <hr className="border-gray-500" />

        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaCopy /></span>
          <span>Copy</span>
          <span className="ml-auto text-gray-500">CMD + C</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaCut /></span>
          <span>Cut</span>
          <span className="ml-auto text-gray-500">CMD + X</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className={iconClasses}><FaTrash /></span>
          <span>Delete</span>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
