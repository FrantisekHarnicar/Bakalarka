//import logo from './logo.svg';
import './styles/App.css';
import Nav from './screens/Nav';
import TeacherLogin from './screens/TeacherLogin';
import StudentLogin from './screens/StudentLogin';
import Teacher from './screens/Teacher';
import Student from './screens/Student';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from "./screens/ProtectedRoutes"

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path='/' element={<Nav/>} >
            <Route path='teacherlogin' element={<TeacherLogin/>} />
            <Route path='studentlogin' element={<StudentLogin/>} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/teacher' element={<Teacher/>} />
          </Route>
          <Route path='/student' element={<Student/>} />
          <Route path='*' element={<Nav/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;