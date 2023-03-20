import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import { Routes,Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import Signup from './Component/auth/Signup';
import Home from './Component/Home';
import Login from './Component/auth/Login';
import Table2 from './Component/Table2';
import Table3 from './Component/Table3';
import Table4 from './Component/Table4';
import BaseLayout from './baseLayout/BaseLayout';
import {Spin} from 'antd';
import { setAuthData,setLoading,resetAuthData } from './feature/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/firebaseConfig'
import axios from 'axios';
import store from './store';
import { useEffect } from 'react';
function App() {

  const dispatch = useDispatch()
  const {isLoading,user} = useSelector((state)=>state).user
  console.log('user : ',user)

 const fetchData = async(token)=>{
    let res = await axios.get(`http://localhost:4000/api/products`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log('fetched data :', res.data)
    return res;
  }
  

  useEffect(()=>{
    store.subscribe(()=>{
      let user = store.getState()
       console.log("store.getState() : ",user)
       
    })
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setLoading(false));

      if (user) {
         dispatch(setAuthData({user:user}));
         if(user.accessToken)fetchData(user.accessToken)
      } else {
         dispatch(resetAuthData());
      }
    });

    

    return unsubscribe;

  },[])
 
console.log('isLoading: ',isLoading)
  return (
    <>
    {isLoading &&
       ( <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>)
    }

    {!isLoading && (<div>
      <Routes>
       <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<BaseLayout/>} >
              <Route path='/home' element={<Home/>} />
              <Route path='/table2' element={<Table2 />} />
              <Route path='/table3' element={<Table3 />} />
              <Route path='/table4' element={<Table4 />} />
          </Route>
       </Route>  
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </div>)}
    </>
  );
}

export default App;
