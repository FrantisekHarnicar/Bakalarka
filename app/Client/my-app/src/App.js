//import logo from './logo.svg';
import './styles/App.css';
import MainScreen from './screens/MainScreen';
import TeacherLogin from './screens/TeacherLogin';
import StudentLogin from './screens/StudentLogin';
import Teacher from './screens/Teacher';
import Student from './screens/Student';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from "./screens/ProtectedRoutes"

function App() {
  return (
    <Router>
      <div >
      <Routes>
          <Route path='/' element={<MainScreen/>} >
            <Route path='teacherlogin' element={<TeacherLogin/>} />
            <Route path='studentlogin' element={<StudentLogin/>} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/teacher' element={<Teacher/>} />
          </Route>
          <Route path='/student' element={<Student/>} />
          <Route path='*' element={<MainScreen/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;