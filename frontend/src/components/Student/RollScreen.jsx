import React, { useState } from 'react';
import { Dice } from './Dice';

export const RollScreen = ({username}) => {
  const [rollCount, setRollCount] = useState(0);
  const [sumCount, setSumCount] = useState(0);
  const [rollValues, setRollValues] = useState([]);

  function rollCallback(roll) {
    setRollCount(rollCount + 1);
    setSumCount(sumCount + roll);
    setRollValues([...rollValues, roll])
  }

  function getLastFiveRollValues() {
    if (rollValues.length <= 5) {
      return rollValues
    } else {
      return rollValues.slice(rollValues.length - 5, rollValues.length)
    }
  }

  function getLastFiveString() {
    const lst = getLastFiveRollValues()
    return lst.join(', ')
  }

  return (
    <>
      <h1 className="mb-5">{username}'s Rolls</h1>
      <Dice rollValues={rollValues} rollCallback={rollCallback} />
      <p>Roll count: {rollCount}</p>
      <p>Mean of rolls: {isNaN(sumCount / rollCount) ? 0 : Math.round(sumCount * 100 / rollCount) / 100}</p>
      <p>Last 5 Rolls: {getLastFiveString()}</p>
    </>
  )
}