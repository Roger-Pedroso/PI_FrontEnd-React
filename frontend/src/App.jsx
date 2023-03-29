import React from 'react';
// import { PanelMenu } from 'primereact/panelmenu';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="flex justify-content-between gap-3" style={{ height: '97vh', width: '98vw' }}>
      <div style={{
        width: '20%',
        backgroundColor: 'rgba(89,31,107,255)',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '2px 2px 7px 2px #471956',
        border: '2px',
        borderColor: 'black',
      }}
      >
        <SideBar />
      </div>
      <div style={{ width: '80%', backgroundColor: '#DEDEDE' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
