
import React from 'react';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <div>
      {/* MAIN CONTENT */}
      <Outlet />
    </div>
  );
};

export default SimpleLayout;
