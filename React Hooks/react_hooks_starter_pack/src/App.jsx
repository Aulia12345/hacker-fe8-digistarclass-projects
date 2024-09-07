import reactLogo from '/react.svg';
import {useState, useEffect} from 'react'; 
import './App.css'

function App() {

  // inisialisasi state
  // tipe array (value array)
  const [list, setList]= useState([]); 
  // tipe string (value string)
  const [newToDo, setNewToDo]=useState('');

  useEffect(()=>{
    // menyimpan data todo di local storage
    const storedTodos = localStorage.getItem('todos');
  if(storedTodos){
    setList(JSON.parse(storedTodos));
  } },[]);

  useEffect(()=>{
    if(newToDo){
      localStorage.setItem('todos', JSON.stringify(list));
      setNewToDo('');
    }
  }, [list]);
  console.log([list])

  // submit
  const handleSubmit =(event)=>{
    event.preventDefault();
    if(newToDo.trim() !== ''){
      setList ([...list, newToDo])
    }  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>To Do List</h1>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={newToDo} onChange={e=>setNewToDo(e.target.value)} placeholder='add new to do'/>
          <button type='submit'>Add List</button>
        </form>
      </div>

      <div className='cardList'>
        {list.map((item, idx)=>{
          return(
            <p key={idx}>{item}</p>
          )
        })}

      </div>
    </>
  )
}

export default App
