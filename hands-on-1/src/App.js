import { useState } from 'react';
import Counter from './Components/Counter';
import './App.css';

const User = (props) =>{
  const {name} = props;
  return(
    <div>
      <h1 className='name'>
        My Name is {name}
      </h1>
    </div>
  );
};

function App() {

const [name] = useState('John Doe');

  return (
    <div className='App'>
      <div>
        <h1 className='title'>
          React Component
        </h1>
        <User name={name}/>
        <Counter initialCount={0}/>
      </div>
    </div>
  );
}

export default App;
