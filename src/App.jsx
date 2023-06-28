import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addCount } from './features/podcastStore/podcastStoreSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(addCount())
  }

  return (
    <div className="App">
      <button onClick={onClick}>Click</button>
    </div>
  )
}

export default App
