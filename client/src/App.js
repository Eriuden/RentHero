import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import ConnexionForm from './pages/ConnexionForm';
import InscriptionForm from './pages/InscriptionForm';
import Header from './Component/Header';
import MissionsList from './pages/MissionsList';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from './redux/actions/users.actions';
import HeroProfile from './pages/HeroProfile';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUsers())
  })

  return (
    <div className="App">
    
      <Header/>

      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/connexion" element={<ConnexionForm/>}/>
        <Route path = "/inscription" element={<InscriptionForm/>}/> 
        <Route path = "/missionList" element={<MissionsList/>}/>
        <Route path = "/profile/:id" element={<HeroProfile/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
