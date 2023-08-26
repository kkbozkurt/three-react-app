import logo from './logo.svg';
import './App.css';
import { Suspense, useState } from "react";
import Model from './components/Model';
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";


function App() {
  const [playAction, setPlayAction] = useState(false);
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Model name = {"TPose"} path = {"./models/soldier.glb"} playAction = {playAction} />
          <OrbitControls />
          <Stats />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
      <button onClick={(()=>{setPlayAction(!playAction)})}>
        press
      </button>
    </div>
  );
}

export default App;
