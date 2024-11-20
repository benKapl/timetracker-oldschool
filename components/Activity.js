import { useDispatch, useSelector } from 'react-redux';
import { updateTimer } from "../reducers/activities";
import { useState, useEffect } from 'react';
import styles from '../styles/Activity.module.css';

function Activity({ name, timer, deleteActivity }) {
  const [seconds, setSeconds] = useState(timer)
  const [isRunning, setIsRunning] = useState(false)

  const dispatch = useDispatch()

  const activityTimer = new Date(seconds*1000).toISOString().slice(11, 19);

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    let payload = {
      name: name,
      timer: seconds,
    }
    dispatch(updateTimer(payload))
  }, [seconds])

  const startTimer = () => setIsRunning(true)
  const stopTimer = () => setIsRunning(false)

  return (
    <>
      <div className={styles.activityWindow}>
        <div className={styles.activityHeader}>
          {name}
          <div 
            className={styles.delete}
            onClick={() => deleteActivity(name)}>X</div>
        </div>

        {activityTimer}

        <div className={styles.buttonSection}>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
        </div>
      </div>
    </>
  );
}

export default Activity;
