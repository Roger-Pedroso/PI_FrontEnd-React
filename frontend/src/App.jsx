/* eslint-disable no-restricted-globals */
import React from 'react';
// import { PanelMenu } from 'primereact/panelmenu';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import SideBar from './components/SideBar';

function App() {
  const location = useLocation();
  const { id } = useParams();

  function whenKey() {
    return (
      <div style={{
        width: '100%', backgroundColor: '#DEDEDE', borderRadius: '5px',
      }}
      >
        <Outlet />
      </div>
    );
  }
  function whenNotKey() {
    return (
      <div className="flex justify-content-between" style={innerWidth > 600 ? { height: '97vh', width: '98vw', gap: '15px' } : { height: '98vh', width: '98vw' }}>
        <div style={innerWidth < 600 ? {
          borderColor: 'black',
        } : {
          width: '20%',
          backgroundColor: 'rgba(89,31,107,255)',
          padding: '15px',
          borderRadius: '5px',
          boxShadow: '0 1px 5px 5px #471956',
          border: '2px',
          borderColor: 'black',
        }}
        >
          {innerWidth > 600 && <SideBar />}
        </div>
        <div style={innerWidth > 600 ? {
          width: '80%', backgroundColor: '#DEDEDE', borderRadius: '5px', overflow: 'scroll',
        } : {
          width: '100%', backgroundColor: '#DEDEDE', borderRadius: '5px', overflow: 'scroll',
        }}
        >
          <Outlet />
        </div>
      </div>
    );
  }
  return (
    <div>
      {(location.pathname === `/app/quizes/answer/${id}`) ? whenKey() : whenNotKey()}
    </div>
  );
}

export default App;
