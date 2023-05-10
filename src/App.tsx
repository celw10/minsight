// Style import
import './App.css';
// Router import
import { Routes, Route } from 'react-router-dom';
// Local import
import { Navigation } from './assets/components/Navigation';
import { Footer } from './assets/components/Footer';
import { Home } from './pages/Home';
import { DataRoom } from "./pages/DataRoom";
import { Feedback } from './pages/Feedback';
// import { Account } from './pages/Account'; - future implementation

//Render Nav and Footer in the app section once but with the correct styling
function App() {
  return(
    <>
      <Navigation /> 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='dataroom' element={<DataRoom/>} />
        <Route path='contact' element={<Feedback/>} />
        {/* <Route path='account' element={<Account/>} /> - future implementaiton */}
      </Routes>
      <Footer />
    </>

  );
}

export default App