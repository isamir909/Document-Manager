
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import PrivateComponent from "./PrivateComponent/privateRoute"
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home.js/Home';
import Document from './components/Documents/Document';
import Profile from './components/Profile/Profile';
import TextConverter from './components/Documents/TextConverter/TextConverter';
import AddStorage from './components/premium/AddStorage';

function App() {

  return ( 
    <div className="App">
    <BrowserRouter>
    <NavBar/>
    <Routes>
     <Route element={<PrivateComponent/>}>
     <Route path='/' element={<Home/>}/>
     <Route path="/documents" element={<Document />}/>
     <Route path={`/user/:id`} element={<Profile />}/>
     <Route path={`/user/premium`} element={<AddStorage />}/>
     <Route path="/logout" element={<Profile />}/>
     <Route path={`/document/:documentid/to-text`} element={<TextConverter />}/>
     <Route path={`/document/:documentid`} element={<TextConverter />}/>

     </Route>
     <Route path='/register' element={<Register/>}/>
     <Route path="/login"  element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
