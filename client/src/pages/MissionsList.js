import React, {useState, useEffect} from 'react'
import MissionCard from '../Component/MissionCard'
import { useDispatch } from "react-redux"
import { getAllMissions } from "../redux/actions/missions.actions"

export default function MissionsList() {
  const [listData, setListData] = useState([])
  const dispatch = useDispatch()

  useEffect(()=> {
    let missionId = window.localStorage.missions 
    ? window.localStorage.missions.split (",")
    : []

    for (let i = 0; i < missionId.length; i++) {
      dispatch(getAllMissions(missionId[i]).then((res) =>
      setListData((listData) => [...listData,res.data])))
    }
  }, [])
  return (
    <div>
      <h2>Votre historique de mission</h2>
      <div className='result'>
        {listData.length > 0 ? (
          listData.map((mission)=> 
          <MissionCard missionProps={mission} key={mission.id} />)
        ) :(
          <h2>Vous n'avez encore aucune mission actuellement</h2>
        )}
      </div>
    </div>
  )
}
