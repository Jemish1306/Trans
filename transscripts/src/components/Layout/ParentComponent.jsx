// src/components/Layout/ParentComponent.jsx
import React, { useState } from 'react';
import ContextMenu from './ContextMenu';

const ParentComponent = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const openContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  return (
    <div onContextMenu={openContextMenu} className="relative h-screen bg-gray-100">
      {/* Your main content here */}
      {contextMenu && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} closeMenu={closeContextMenu} />
      )}
    </div>
  );
};

export default ParentComponent;
