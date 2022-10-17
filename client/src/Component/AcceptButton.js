import React, { useContext, useEffect, useState} from 'react'
import {UidContext} from "./AppContext"
import { acceptMission } from '../redux/actions/missions.actions'
import { abandonMission } from '../redux/actions/missions.actions'
import { useDispatch } from 'react-redux'

export default function AcceptButton({mission}) {
    const [accepted, setAccepted] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const accept = () => {
        dispatch(acceptMission(mission._id, uid))
        setAccepted(true)
    }
    const abandon = () => {
        dispatch(abandonMission(mission._id, uid))
        setAccepted(false)
    }

    useEffect(()=> {
        if(mission.missionAcceptedBy.includes(uid)) setAccepted(true)
        else setAccepted(false)
    }, [uid, mission.missionAcceptedBy, accepted])


  return (
    <div>

      { uid === null && (
        <p>Vous devez être connecté pour accepter la mission</p>
      )}

      {
        uid && accepted === false && (
            <p onClick={accept}>Accepter</p>
        )
      }

      {
        uid && accepted === true && (
            <p onClick={abandon}>Se retirer de la mission</p>
        )
      }
      
    </div>
  )
}
