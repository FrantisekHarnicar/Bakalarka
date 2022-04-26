//import logo from './logo.svg';
import './styles/App.css';
import Nav from './screens/Nav';
import Home from './screens/Home';
import Tweet from './screens/Tweet';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/tweets' element={<Tweet/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;