import React, { useState, useRef } from 'react';
import { socket } from '../../socket';
import './dice.css'

export const Dice = ({rollValues, rollCallback}) => {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const diceRef = useRef(null);

  function randomDice() {
    rollDice(Math.ceil(Math.random() * 6));
  }

  function getRotation(roll) {
    // return x, y degree rotation from 1 to the roll
    switch (roll) {
      case 1:
        return [0, 0]
      case 2:
        return [-90, 0]
      case 3:
        return [0, 90]
      case 4:
        return [0, -90]
      case 5:
        return [90, 0]
      case 6:
        return [180, 0]
      default:
        return [0, 0]
    }
  }

  function getTotalRotation(start, end) {
    // start and end are 1-6
    let [x1, y1] = getRotation(start)
    let [x2, y2] = getRotation(end)
    return [x2 - x1, y2 - y1]
  }

  function rollDice(roll) {
    // animation
    const dice = diceRef.current;
    let [x, y] = getTotalRotation(rollValues[rollValues.length - 1], roll)
    x += 360
    y += 360
    setRotX(rotX + x)
    setRotY(rotY + y)
    dice.style.transform = `rotateX(${rotX + x}deg) rotateY(${rotY + y}deg)`;

    // update the logic
    rollCallback(roll)
    
    // emit event
    socket.emit('sendIncrement', roll)
  }

  return (
    <div className="container" id="dice">
      {/* Dice roll animation from: https://github.com/hosseinnabi-ir/Roll-Dice-Project-using-CSS-and-JavaScript/blob/AngularProject/css/style.css */}
      <div className="dice" ref={diceRef}>
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face right"></div>
        <div className="face left"></div>
      </div>
      <button className="btn btn-primary mt-5 mb-3" onClick={randomDice}>Roll Dice</button>
    </div>
  )
}