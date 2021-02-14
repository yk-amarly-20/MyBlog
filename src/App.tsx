import React from 'react';
import './App.css';
import { TopPage } from 'components/TopPage';
import { SideMenu } from 'components/sub_menu/SideMenu';
function App() {
  return (
    <div>
      <TopPage />
      <SideMenu/>
    </div>
  )
}

export default App;
