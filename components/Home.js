import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivityToStore, removeActivityFromStore } from "../reducers/activities";
import Activity from './Activity';
import styles from '../styles/Home.module.css';

function Home() {
  const [activityInput, setActivityInput] = useState("")
  
  const dispatch = useDispatch()
  const activities = useSelector(state => state.activities.value)

  const addActivity = () => {
    dispatch(addActivityToStore(activityInput))
    setActivityInput("")
  }

  const deleteActivity = (activityName) => {
    dispatch(removeActivityFromStore(activityName))
  }

  const activitiesComponents = activities.map((data, i) => {
    return <Activity key={i} name={data.name} timer={data.timer} deleteActivity={deleteActivity}/>;
  });

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.trackerWindow}>
          <div className={styles.trackerHeader}>
            Time tracker
          </div>
          <div className={styles.addSection}>
            <input 
              type="text" 
              placeholder="Activity name" 
              id="activityName" 
              onChange={(e) => setActivityInput(e.target.value)}
              value={activityInput}/>
            <button id="add" onClick={addActivity}>Add activity</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        {activitiesComponents}
      </div>
    </div>
  );
}

export default Home;
