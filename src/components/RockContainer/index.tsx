import React from 'react';
import './index.css';

interface RockContainerProps {
  children: React.ReactNode;
}

const RockContainer: React.FC<RockContainerProps> = ({ children }) => {
  return <div className='rock-container'>{children}</div>
}

export default RockContainer;