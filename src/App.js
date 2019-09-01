import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Display } from './testComponent';

function App() {  
  const [counter, setCounter] = useState(5);  
  const incrementCounter = (ammount) => setCounter(counter + ammount);
  return (    
    <div>
      <Button onClick={incrementCounter} increment={1}/>
      <Button onClick={incrementCounter} increment={5}/>
      <Button onClick={incrementCounter} increment={10}/>
      <Button onClick={incrementCounter} increment={100}/>
      <Display message={counter}/>
    </div>
  );
}

export default App;
