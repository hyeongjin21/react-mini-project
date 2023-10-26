import { Routes, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail';
import SearchMovie from './components/SearchMovie';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies/:id' element={<MovieDetail/>}></Route>
        <Route path='/search' element={<SearchMovie/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
