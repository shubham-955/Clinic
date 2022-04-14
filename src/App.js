import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Appointment } from './Pages/Appointment/Appointment';
import { Navbar } from './Components/Navbar/Navbar';
import { Scheduled } from './Pages/Scheduled/Scheduled';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path=':id' element={<Appointment />} />
          <Route exact path='/scheduled' element={<Scheduled />} />
        </Routes>
      </div>
    </>
  );
}



export default App;
