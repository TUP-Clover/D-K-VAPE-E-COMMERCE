import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Vapes from './components/Vapes';
import Admin from './components/admin';
import Login from './components/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Vapes />}></Route>
        <Route path='/Vapes' element={<Vapes />}></Route>
        <Route path='/Admin' element={<Admin />}></Route>
        <Route path='/Products' element={<Products />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
