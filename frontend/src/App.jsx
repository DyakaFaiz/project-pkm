import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProducList from './components/ProducList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import './App.css';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProducList/>}/>
      <Route path="add" element={<AddProduct/>}/>
      <Route path="edit/:id" element={<EditProduct/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
