//import logo from './logo.svg';
import './styles/App.css';
import Nav from './screens/Nav';
import Teacher from './screens/Teacher';
import Student from './screens/Student';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Routes>
          
            <Route path='/teacher' element={<Teacher/>} />
            <Route path='/student' element={<Student/>} />
          </Routes>
          
      </div>
    </Router>
  );
}

export default App;