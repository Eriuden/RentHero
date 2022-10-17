import React, {useEffect} from 'react';
import { getMission } from '../redux/actions/missions.actions';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux';
import AcceptButton from '../Component/AcceptButton';


export default function MissionPage({mission}) {
  const user = useSelector((state) =>state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMission(mission._id))
  })
  return (
    <div>

      <p>{mission.description}</p>
      <p>{mission.numberOfHero} héros sont requis pour cette mission</p>
      <p>Le montant de la récompense est de {mission.wage} par héros</p>
      <p>Cette mission se déroule vers {mission.geolocalisation}</p>

      <h2>Héros déjà sur cette mission : {mission.missionAcceptedBy.length} </h2>

    {mission.missionAcceptedBy < mission.numberOfHero} && (
      {user.role === "héros" &&(
        <AcceptButton/>
      )}
    )
    

    </div>
  )
}
