import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket';
import './dice.css';

export const Student = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rollCount, setRollCount] = useState(0);
  const [sumCount, setSumCount] = useState(0);
  const diceRef = useRef(null);  

  useEffect(() => {
    // mount javascript for dice roll    

    socket.connect();

    function onConnect() {
      console.log('connected to server')
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  function sendIncrement() {
    socket.emit('sendIncrement', 1)
  }

  // Test code - delete later
  function sendOne() {
    socket.emit('sendOne', 1)
  }

  function sendTwo() {
    socket.emit('sendTwo', 1)
  }

  function sendThree() {
    socket.emit('sendThree', 1)
  }
  
  function sendFour() {
    socket.emit('sendFour', 1)
  }

  function sendFive() {
    socket.emit('sendFive', 1)
  }

  function sendSix() {
    socket.emit('sendSix', 1)
  }

  function randomDice() {
    const random = Math.floor(Math.random() * 10);

    if (random >= 1 && random <= 6) {
      rollDice(random);
    } else {
      randomDice();
    }
  }

  function rollDice(random) {
    const dice = diceRef.current;
    dice.style.animation = "rolling 4s";

    setTimeout(() => {
      switch (random) {
        case 1:
          dice.style.transform = "rotateX(0deg) rotateY(0deg)";
          break;

        case 6:
          dice.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;

        case 2:
          dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;

        case 5:
          dice.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;

        case 3:
          dice.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;

        case 4:
          dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;

        default:
          break;
      }

      dice.style.animation = "none";
    }, 4050);
  }

  return (
    <div className="App">
      {/* Dice roll animation from: https://github.com/hosseinnabi-ir/Roll-Dice-Project-using-CSS-and-JavaScript/blob/AngularProject/css/style.css */}
      <div className="container">

        <div className="dice" ref={diceRef}>
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
          <div className="face right"></div>
          <div className="face left"></div>
        </div>

        <button className="roll" onClick={randomDice}>
          Roll Dice
        </button>

      </div>

      <p>State: {'' + isConnected}</p>
      <button onClick={sendIncrement}>Send increment</button>
      {/* Test code - delete later */}
      <button onClick={sendOne}>Send one</button>
      <button onClick={sendTwo}>Send two</button>
      <button onClick={sendThree}>Send three</button>
      <button onClick={sendFour}>Send four</button>
      <button onClick={sendFive}>Send five</button>
      <button onClick={sendSix}>Send six</button>

    </div>
  );
}

