import React,{useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Spotify from "./components/Spotify";
import { useStateProvider } from './utilities/StateReducer';
import { reducerCases } from './utilities/Constants';

export default function App() {
  const [{token},dispatch]=useStateProvider();
  useEffect(()=>{
    const hash = window.location.hash;
    if(hash){
      const token= hash.substring(1).split("&")[0].split("=")[1];
      dispatch({type:reducerCases.SET_TOKEN,token});
    }
  },[token,dispatch]);
  return (
    <div className="App">
    {token ? <Spotify/>: <Login/>}
    </div>
  );
}