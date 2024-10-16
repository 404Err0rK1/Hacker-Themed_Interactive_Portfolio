import React, { useState } from 'react';

const NmapMinigame = ({ onComplete }) => {
  const [ports, setPorts] = useState(generatePorts());
  const [scannedPorts, setScannedPorts] = useState([]);
  const [message, setMessage] = useState('');

  function generatePorts() {
    return Array(10)
      .fill()
      .map(() => ({
        number: Math.floor(1000 + Math.random() * 9000),
        open: Math.random() > 0.7,
      }));
  }

  const scanPort = (index) => {
    if (scannedPorts.includes(index)) {
      setMessage('Port already scanned!');
      return;
    }
    setScannedPorts([...scannedPorts, index]);
    setMessage(ports[index].open ? 'Open port found!' : 'Port is closed.');
    if (scannedPorts.length === 9) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl mb-2">Scan for open ports</h3>
      <div className="grid grid-cols-5 gap-2">
        {ports.map((port, index) => (
          <button
            key={index}
            onClick={() => scanPort(index)}
            className={`p-2 rounded ${
              scannedPorts.includes(index)
                ? port.open
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : 'bg-gray-600'
            }`}
          >
            {port.number}
          </button>
        ))}
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default NmapMinigame;
