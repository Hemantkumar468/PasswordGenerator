import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (includeNumbers) str += '0123456789';
    if (includeSpecialChars) str += '!@#$%^&()-_=+{}[]:;';

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, includeNumbers, includeSpecialChars]);

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeSpecialChars, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    if (password) {
      window.navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!');
    }
  }, [password]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-2xl text-center my-4'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='bg-orange-500 text-white px-3'
          >
            Copy
          </button>
        </div>

        <div className='flex flex-col gap-4 mb-4'>
          <div className='flex items-center gap-2'>
            <input
              type='range'
              min='4'
              max='20'
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
            />
            <label>Include Numbers</label>
          </div>

          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars((prev) => !prev)}
            />
            <label>Include Special Characters</label>
          </div>

          <button
            onClick={passwordGenerator}
            className='bg-orange-500 text-white px-4 py-2 rounded'
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
