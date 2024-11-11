// src/components/Layout/ContextMenu.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  FaPlay, FaLink, FaDownload, FaFileExport, FaBold, FaItalic, FaUnderline,
  FaStrikethrough, FaHighlighter, FaCopy, FaCut, FaTrash,
} from 'react-icons/fa';

const ContextMenu = ({ 
  x, 
  y, 
  onPlay = () => console.log('Play clicked'), 
  onShare = () => console.log('Share clicked'), 
  onDownload = () => console.log('Download clicked'), 
  onExport = () => console.log('Export clicked'), 
  onBold = () => console.log('Bold clicked'), 
  onItalic = () => console.log('Italic clicked'), 
  onUnderline = () => console.log('Underline clicked'), 
  onStrikethrough = () => console.log('Strikethrough clicked'), 
  onHighlight = () => console.log('Highlight clicked'), 
  onCopy = () => console.log('Copy clicked'), 
  onCut = () => console.log('Cut clicked'), 
  onDelete = () => console.log('Delete clicked') 
}) => {
  const iconClasses = "flex items-center justify-center w-6 h-6 rounded-full bg-black text-textcolor";

  return (
    <div
      className="fixed z-100 bg-contextmenu text-black p-4 rounded-lg shadow-lg border border-red-500" // Added border for visibility
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="space-y-3">
        <li className="flex items-center space-x-2" onClick={onPlay}>
          <span className={iconClasses}><FaPlay /></span>
          <span>Play (from :49)</span>
          <span className="ml-auto text-gray-500">TAB</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onShare}>
          <span className={iconClasses}><FaLink /></span>
          <span>Share Clip (from :49)</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onDownload}>
          <span className={iconClasses}><FaDownload /></span>
          <span>Download Section</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onExport}>
          <span className={iconClasses}><FaFileExport /></span>
          <span>Export to new File</span>
        </li>

        <hr className="border-gray-500" />

        <li className="flex items-center space-x-2" onClick={onBold}>
          <span className={iconClasses}><FaBold /></span>
          <span>Bold Text</span>
          <span className="ml-auto text-gray-500">CMD + B</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onItalic}>
          <span className={iconClasses}><FaItalic /></span>
          <span>Italicize Text</span>
          <span className="ml-auto text-gray-500">CMD + I</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onUnderline}>
          <span className={iconClasses}><FaUnderline /></span>
          <span>Underline Text</span>
          <span className="ml-auto text-gray-500">CMD + U</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onStrikethrough}>
          <span className={iconClasses}><FaStrikethrough /></span>
          <span>Strikethrough Text</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onHighlight}>
          <span className={iconClasses}><FaHighlighter /></span>
          <span>Highlight Text</span>
        </li>

        <hr className="border-gray-500" />

        <li className="flex items-center space-x-2" onClick={onCopy}>
          <span className={iconClasses}><FaCopy /></span>
          <span>Copy</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onCut}>
          <span className={iconClasses}><FaCut /></span>
          <span>Cut</span>
        </li>
        <li className="flex items-center space-x-2" onClick={onDelete}>
          <span className={iconClasses}><FaTrash /></span>
          <span>Delete</span>
        </li>
      </ul>
    </div>
  );
};

ContextMenu.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onPlay: PropTypes.func,
  onShare: PropTypes.func,
  onDownload: PropTypes.func,
  onExport: PropTypes.func,
  onBold: PropTypes.func,
  onItalic: PropTypes.func,
  onUnderline: PropTypes.func,
  onStrikethrough: PropTypes.func,
  onHighlight: PropTypes.func,
  onCopy: PropTypes.func,
  onCut: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ContextMenu;
