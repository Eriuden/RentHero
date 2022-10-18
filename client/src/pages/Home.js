import React, { useEffect } from 'react'
import MissionCard from '../Component/MissionCard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllMissions } from '../redux/actions/missions.actions';
import { isEmpty } from '../utils';

export default function Home() {

  const Missions = useSelector((state) => state.allMissionsReducer)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllMissions())
  })


  return (
    <div>
      <ul>
        {!isEmpty(Missions) && Missions.map((mission) => {
          <MissionCard missionProps={mission} key={mission._id}/>
        })}
      </ul>
    </div>
  )
}
