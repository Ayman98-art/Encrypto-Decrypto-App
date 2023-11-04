import React, { useState, useEffect }  from 'react';
import CryptoJS from 'crypto-js';
import './App.css';

const SECRAT_PASS = 'xksdgfj83aldjcbkx';

function App() {
// DarkMood
const [ theme , setTheme] = useState(false);
useEffect(()=>{
    if (theme === true) {
        document.body.classList.add("DarkMood")
    } else {
        document.body.classList.remove("DarkMood")
    }
})

// active btn
  const [active, setActive] = useState('Encrypto');

// text input
const [text, setText] = useState('');

// error message
  const [error, setError] = useState('');

// store encryptoData
const [encryptoData, setEncryptoData] = useState('')

// store decryptoData
const [decryptoData, setDecryptoData] = useState('')

// swtich between btn
  const handlerSwtich = (type)=> {
    setActive(type);
// clear all data and error message when swtich screen
    setText('');
    setDecryptoData('');
    setEncryptoData('');
    setError('')
  }

  const handlerEncryptoData = ()=>{
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),SECRAT_PASS).toString();
        setEncryptoData(data);
        setError('')
      }
      catch (error) {
      setError('please Enter text')
    }
  }

  const handlerDecryptoData = ()=>{
    try {
      const beyts = CryptoJS.AES.decrypt(text,SECRAT_PASS)
      const data = JSON.parse(beyts.toString(CryptoJS.enc.Utf8))
        setDecryptoData(data);
        setError('')
      }
      catch (error) {
      setError('please Enter text')
    }
  }

  const handlerClick = ()=> {
    if (!text) {
      setError('please Enter text');
      return null;
    }

    if (active === 'Encrypto') {
      handlerEncryptoData()
    } else {
      handlerDecryptoData()
    }
  }

  const handlerCopy = async function(){
    await navigator.clipboard.writeText(
      `${active === 'Encrypto' ? encryptoData : decryptoData}`
      )
      alert('successfully copied');
  }

  const handleMood = ()=>{
    setTheme(!theme)
  }

  return (
  <>
    <div className="container">

      <div className='mood'>
        <button onClick={handleMood}>
          {theme? '☀️' : '🌚'}
        </button>
      </div>

      <div className='Encrypto-Decrypto'>
        <button className={`btn btn-left ${active === 'Encrypto' ? 'active' : '' }`} 
        onClick={()=>{handlerSwtich('Encrypto')}}
        >
          Encrypto
        </button>
        <button className={`btn btn-right ${active === 'Decrypto' ? 'active' : '' }`} 
        onClick={()=>{handlerSwtich('Decrypto')}}
        >
          Decrypto
        </button>
      </div>

      <div className='card'>
        <textarea 
          maxLength="120"
          value={text}
          onChange={({target})=>setText(target.value)}
          placeholder=
          {`
          ${active === 'Encrypto'? 'Enter Your Text to Decrypto' : 'Enter Your Encrypto Text'}
          `}
        />

        {error && <div className='erro'>{error}</div>}

        <button
        className=
        {`
          btn btn-submit 
          ${active === 'Encrypto' ? 'btn-Encrypto' : 'btn-Decrypto'}
        `}
        onClick={handlerClick}
        >
          {active === 'Encrypto'? 'Encrypto': 'Decrypto' }
        </button>
      </div>

      <div>
      {
        encryptoData || decryptoData ?
        (<div className='content'>
          <div className='content-label'>
            <div>
              <label>
                {active === 'Encrypto' ? 'Encrypto' : 'Decrypto'}Data
              </label>
            </div>
            <div>
              <button onClick={handlerCopy} className={`copy`}> 📋</button>
            </div>
          </div>
          <p>
            {active === 'Encrypto' ? encryptoData : decryptoData}
          </p>
        </div>)
        : null
      }
      </div>

    </div>
  </>
)
}

export default App;