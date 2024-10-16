import React, { useState } from 'react';

const DecryptionMinigame = ({ onComplete }) => {
  const [code, setCode] = useState(generateRandomCode());
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const handleGuess = () => {
    if (userGuess === code) {
      setFeedback('Decryption successful!');
      setTimeout(onComplete, 1500);
    } else {
      let correct = 0;
      for (let i = 0; i < 4; i++) {
        if (userGuess[i] === code[i]) correct++;
      }
      setFeedback(`${correct} digits correct`);
    }
    setUserGuess('');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl mb-2">Decrypt the 4-digit code</h3>
      <input
        type="text"
        maxLength="4"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded"
      />
      <button onClick={handleGuess} className="ml-2 bg-blue-500 text-white p-2 rounded">
        Guess
      </button>
      <p className="mt-2">{feedback}</p>
    </div>
  );
};

export default DecryptionMinigame;
