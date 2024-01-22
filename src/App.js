import React, { useState, useEffect, useCallback } from 'react';
import Button from './button.js';
import './App.css';

function App({audio}) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(2);
  const [counter, setCounter] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState('Pomodoro');
  const [timerTimeout, setTimerTimeout] = useState(false);

  const stopTimeOutAlarm = useCallback(() => {
    // console.log('audio.paused: ',audio.paused);
    // console.log('audio.time: ',audio.currentTime);
    audio.pause();
    audio.currentTime = 0.0;
    setTimerTimeout(false);
    // console.log('audio.paused: ',audio.paused);
    // console.log('audio.time: ',audio.currentTime);
  },[audio]);

  const nextTimer = useCallback(() => {
    let sec, min, timer_type;
    setCounter((prevCounter)=> prevCounter + 1);
    // console.log('ssshetty: counter b4: ',counter);
    if ( counter % 8 === 0 ) {
      // sec = 1.5;
      min = 15;
      timer_type = 'Break';
    } else if ( counter % 2 === 0 ) {
      // sec = 1;
      min = 5;
      timer_type = 'Break';
    } else {
      min = 25;
      // sec = 2;
      timer_type = 'Pomodoro';
    }
    // sec = 0;
    setIsActive(true);
    changeTimerStates(min, sec, true, timer_type);
    stopTimeOutAlarm();
  }, [counter, stopTimeOutAlarm]);

  useEffect(() => {
    let interval;

    const playSound = (audio) => {
      setTimerTimeout(true);
      // const audio = new Audio('/alarm_new.mp3');
      // console.log('audio.paused: ',audio.paused);
      audio.play();
      // console.log('audio.paused: ',audio.paused);
    };

    if (isActive) {
      interval = setInterval(() => {
        if (seconds <= 0) {
          if (minutes <= 0) {
            clearInterval(interval);
            setIsActive(false);
            // setCounter((prevCounter)=> prevCounter + 1);
            playSound(audio); // Call the function to play the sound
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [audio, isActive, minutes, nextTimer, seconds]);

  const toggleTimer = () => {
    // console.log('ssshetty: counter: ',counter);
    // console.log('ssshetty: audio: ',(audio));
    if (minutes || seconds) {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    // setIsActive(false);
    // setMinutes(25);
    // setSeconds(0);
    // changeTimerStates(25,0,false,'pomodoro');
    setCounter(1);
    stopTimeOutAlarm();
    changeTimerStates(25,0,false,'Pomodoro',false);
  };

  const changeTimerStates = (min=0, sec=0, active=false, timer_type='', timedout=false) => {
    setIsActive(active);
    setMinutes(min);
    setSeconds(sec);
    setTimerType(timer_type);
    setTimerTimeout(timedout);
  }

  return (
    <div className={`App ${timerType.toLowerCase()}`}>
      <div className='container'>
        <h1>Pomodoro</h1>
        <div className="timer">
          <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
        <div className="controls">
          {counter!==1 && <Button onClickFunc={(!isActive&&timerTimeout)? stopTimeOutAlarm :toggleTimer} buttonText={isActive ? 'PAUSE' : timerTimeout ? 'STOP' : 'START'} />}
          <Button onClickFunc={nextTimer} buttonText={counter===1 ? 'START' : 'START NEXT'} />
          <Button onClickFunc={resetTimer} buttonText={'RESET'} />
        </div>
      </div>
    </div>
  );
}

export default App;
