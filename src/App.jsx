import React, { useState,useCallback,useEffect,useRef } from 'react';

function App() {


  const passwordRef = useRef(null); 
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  
  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);
  }
  ,[password]);

  const passwordGenerator = useCallback(()=>{
    let pass= "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,password]);

  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,setPassword]); 

  return (
    <div className='w-full max-w-d mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <div className='text-center text-2xl font-bold py-4'>
        <input type="text" value={password} className='w-full bg-gray-800 text-center text-2xl font-bold py-4' placeholder='Password' readOnly ref={passwordRef}/>
        <button onClick={copyToClipBoard} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Copy</button>
      </div>
      <div className='flex items-center gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer' 
          onChange={(e)=>setLength(e.target.value)} />
          <label>Length :{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberAllowed"
          onChange={()=> {
            setNumberAllowed((prev)=>!prev);
          }} />
        </div>
          <label>Numbers</label>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllowed}
          id="charAllowed"
          onChange={()=> {
            setCharAllowed((prev)=>!prev);
          }} />
          <label>Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App;