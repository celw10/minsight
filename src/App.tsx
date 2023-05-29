// Style import
import './App.css';
// Router import
import { Routes, Route } from 'react-router-dom';
// Local import
import { Navigation } from './assets/components/Navigation';
import { Footer } from './assets/components/Footer';
import { Home } from './pages/Home';
import { Feedback } from './pages/Feedback';
import { DataRoom2D } from "./pages/DataRoom2D";
import { DataRoom3D } from "./pages/DataRoom3D";
// import { Account } from './pages/Account'; - future implementation

//Render Nav and Footer in the app section once but with the correct styling
function App() {
  return(
    <>
      <Navigation /> 
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='contact/' element={<Feedback/>} />
        <Route path='dataroom/2D/' element={<DataRoom2D/>} />
        <Route path='dataroom/3D/' element={<DataRoom3D/>} />

        {/* <Route path='dataroom/3D/' element={<DataRoom3D/>} /> */}
        {/* <Route path='dataroom/Analysis/' element={<DataRoomAnalysis/>} /> */}

        {/* <Route path='account' element={<Account/>} /> - future implementaiton */}
      </Routes>
      <Footer />
    </>

  );
}

export default App