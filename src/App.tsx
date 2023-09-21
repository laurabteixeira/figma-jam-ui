import './styles/global.css'

import { Canvas } from "./components/Canvas";

export function App() {
  return (
    <div className='w-screen h-screen bg-slate-950'>
      <Canvas />
    </div>
  )
}