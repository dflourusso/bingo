import React, { useMemo } from 'react';
import './index.css'

interface RockProps {
  rock: number;
  active: boolean;
  highlight?: boolean;
}

const Rock: React.FC<RockProps> = ({ rock, active, highlight }) => {
  const additionalClasses = useMemo((): string => {
    if (highlight) return 'highlight'
    if (active) return 'active'
    return ''

  }, [highlight, active])

  return <div key={rock} className={`rock ${additionalClasses}`}>
    <span>{rock}</span>
  </div>
}

export default Rock;