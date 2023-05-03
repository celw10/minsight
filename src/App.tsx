// Style import
import './App.css';
// Router import
import { Routes, Route } from 'react-router-dom';
// Local import
import { Navigation } from './assets/components/Navigation';
import { Footer } from './assets/components/Footer';
import { Home } from './pages/Home';
import { DataRoom } from "./pages/DataRoom";
import { About } from './pages/About';
import { Account } from './pages/Account';

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