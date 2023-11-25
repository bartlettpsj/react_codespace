import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useOnMountUnsafe } from './useOnUnsafeMount'

function App() {
  const [count, setCount] = useState(0)

  
  let interval: number;

  useOnMountUnsafe(() => {
    console.log('Called useEffect - starting timer', Date.now(), count)
    interval = setInterval( ()=> {
      setCount( (value) => value+1);      
    }, 5000);
  }, [count], () => {
    console.log('Cleanup method has been called');
    clearInterval(interval);
   });


  console.log('Render the count is: ', count);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h2>Vite + React</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
