
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
// import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import AddStationMap from './pages/addStationMap';


function App() {


  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/dashboard'element={<Dashboard/>}></Route>
        <Route path='/register'element={<Register/>}></Route>
        <Route path='/stationMap'element={<AddStationMap/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App
