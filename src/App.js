import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Appointment } from './Pages/Appointment/Appointment';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path=':id' element={<Appointment />} />
      </Routes>
    </div>
  );
}



export default App;
