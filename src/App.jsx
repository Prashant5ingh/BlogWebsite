import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import conf from './conf/conf'
import  dataService  from './appwrite/config'
import authService from './appwrite/auth'
import {useDispatch} from 'react-redux';
import {login,logout} from './features/authSlice'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(conf.appwriteUrl)
  // console.log(dataService)

  const [loading, setLoading] = useState(true); // True 
   // loading state for file upload or rendering posts.Whenever we make network / database request.
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else {
        dispatch(logout()) // if no userdata found then logout action dispatched to atleast update the state.
      }
      
    })
    .catch((error) =>{
      console.log("App.jsx :: useEffect :: getCurrentUser :: error", error)
    })
    .finally(() => setLoading(false)) 
  }, [])

  // if(loading){
  //   return <div>Loading...</div>
  // }

  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null; // if not loading then return the app component else return null (you can also return loading spinner or msg)
}

export default App
