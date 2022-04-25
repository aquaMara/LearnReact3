import logo from './logo.svg';
import './App.css';
import Register from './authorization/Register';
import Login from './authorization/Login';
import Test from './authorization/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/r" element={<Register/>}/>
        <Route path="/t" element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
