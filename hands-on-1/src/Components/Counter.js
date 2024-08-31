import React, {useState} from "react";
import './Counter.css'
import '../App.css'

const Counter = ({initialCount})=>{

const [count, setCount] =  useState (initialCount);

const incrementCount = ()=>{
    setCount(count + 1);
};

const decrementCount = ()=>{
    setCount (count - 1);
};

    return(
        <div className="counter">
            <p>
                Count: {count}
            </p>
            <div className="button">
                <button className="decrement" onClick={decrementCount}>Decrement</button>
                <button className="increment" onClick={incrementCount}>Increment</button>
            </div>
        </div>
    );
};

export default Counter;