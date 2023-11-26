import { useMemo, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useOnMountUnsafe } from './useOnUnsafeMount'

function App() {
  const [count, setCount] = useState(0)
  const [change, setChange] = useState(0);
  const ref = useRef(null);


  let interval: number;

  useOnMountUnsafe(() => {
    console.log('Called useEffect - starting timer', Date.now(), count)
    interval = setInterval(() => {
      setCount((value) => value + 1);

      // Every 10 call, affect the memo
      if ((count + 1) % 10 == 0) {
        setChange(count + 1);
      }
    }, 1000);
  }, [count], () => {
    console.log('Cleanup method has been called');
    clearInterval(interval);
  });

  const myMemo = useMemo(() => {
    console.log('Change happened', count);
    return change;
  }, [change]);

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
        <button onClick={() => {
          console.log('MyMemo is:', myMemo);
          setChange(999);

          // Playing with Refs
          console.log('Ref is: ', ref.current);
          // console.log('The Spantext is', ref.current.textContent);
          const span: HTMLSpanElement  = ref.current!;
          span.textContent = 'Changed the value YET again';

          // if (ref?.current?.textContent != null) {
          //   ref.current.textContent = 'new text;'
          // }
        }}>
          Click me {myMemo}
        </button>

        <span style={{ color: 'red' }} ref={ref}>Random Text</span>

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
