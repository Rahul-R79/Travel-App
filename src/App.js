import './App.css';
import React, { useEffect, useState } from 'react'
import Places from './Components/Screens/Places';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Place from './Components/Screens/Place';
import Login from './Components/Screens/Login';
import SignUp from './Components/Screens/SignUp';
import PrivateRoute from './Components/Screens/PrivateRoute';


export const UserContext = React.createContext()

function App() {
  const [userData, setUserData] = useState({})
  const [Loading, setLoading] = useState(true)

  const UpdateUserData = (action) =>{
    switch(action.type){
        case "LOGOUT": 
            setUserData(null)
            localStorage.clear()
            break
        case "LOGIN":
            setUserData(action.payload)
            break
        default:
            break
    }
  }
    //Logout Functionality>>>>>>>>>
    //Login Functionality>>>>>>>>>

  useEffect(() =>{
    setUserData(JSON.parse(localStorage.getItem("user_data")))
    setLoading(false)
  },[])
  //Using useContext to pass token>>>>> Logout function....

  return Loading ? (<h1>Loading...</h1>) : (
    <>
    <UserContext.Provider value={{userData, UpdateUserData}}> 
      <Router>
          <Routes>
              <Route path='/' element= {<Places/>}/>
              <Route path="/places/:id" element={<PrivateRoute children={<Place />} />}/>
              <Route path= 'auth/login' element= {<Login/>}/>
              <Route path= '/auth/create/' element= {<SignUp/>}/>
          </Routes>
      </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;


