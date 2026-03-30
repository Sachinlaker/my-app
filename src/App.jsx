import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { increment, decrement } from './counterSlice';

function App() {
  const count = useSelector((state)=>state.counter.count);
  const dispatch = useDispatch();
  return (
    <>
      <h1>{count}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
    </>
    
  )
}

export default App;
