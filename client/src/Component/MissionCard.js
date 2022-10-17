
import React from 'react'

export default function MissionCard({missionProps}) {

    const dateFormat = (date) => {
        let [yy,mm,dd] = date.split("-")
        return[dd,mm,yy].join("/")
    }

    const aceptMission = () => {
        let storeData = window.localStorage.missions ?
        window.localStorage.missions.split(",")
        : []

        if(!storeData.includes(missionProps.id.toString)) {
            storeData.push(missionProps.id)
            window.localStorage.missions = storeData
            window.location.reload()
        } else {
            window.alert("Vous avez déjà accepté cette mission")
        }
    }

    const abanddonMission = () => {
        let StoreData = window.localStorage.missions.split(",")
        let newData = StoreData.filter((id) => id != missionProps.id)
        window.localStorage.missions = newData
    }

  return (
    <div>
        <p>Description:{missionProps.description}</p>
        <h4>Héros requis:{missionProps.numberOfHero}</h4>
        <p>Où ? :{missionProps.geolocalisation}</p>
        <div onClick={()=> aceptMission()}>Accepter la mission</div>
        <div onClick={()=> abanddonMission()}>Abandonner la mission</div>
      
    </div>
  )
}
