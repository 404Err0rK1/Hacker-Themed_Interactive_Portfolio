import React from 'react';
import { Shield, ShieldOff } from 'lucide-react';

const FirewallVisualizer = ({ firewall }) => {
  return (
    <div className="flex space-x-1 my-2">
      {firewall.map((active, index) =>
        active ? (
          <Shield key={index} className="text-green-500" size={16} />
        ) : (
          <ShieldOff key={index} className="text-red-500" size={16} />
        )
      )}
    </div>
  );
};

export default FirewallVisualizer;
