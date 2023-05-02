// Style import
import './App.css';
// Router import
import { Routes, Route } from 'react-router-dom';
// Local import
import { Navigation } from './assets/test';
import { Footer } from './assets/components/menu';
import { Home } from './assets/components/Home';
import { DataRoom } from "./assets/components/DataRoom";
import { About } from './assets/components/About';
import { Account } from './assets/components/Account';

//Render Nav and Footer in the app section once but with the correct styling
function App() {
  return(
    <>
      <Navigation /> 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='dataroom' element={<DataRoom/>} />
        <Route path='about' element={<About/>} />
        <Route path='account' element={<Account/>} />
        <Route />
      </Routes>
      <Footer />
    </>

  );
}

export default App