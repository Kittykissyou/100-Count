import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';

import './App.css';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<Add />} />
          <Route path="table" element={<h1> table </h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
