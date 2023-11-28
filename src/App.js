import logo from './logo.svg';
import Regform from './components/registration';
import './index.css'
import Home from './components/home';
import Dashboard from './components/dashboard';
import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SetNewRate from './components/dashboardmenu/setNewRate';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/dashboard' element={<Dashboard/>}/>
      <Route exact path='/setrate' element={<SetNewRate/>}/>
      </Routes>

    </Router>
 
  );
}

export default App;
