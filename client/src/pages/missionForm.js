import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMission, getAllMissions } from '../redux/actions/missions.actions'
import { isEmpty } from '../utils'

export default function missionForm() {
    const [description, setDescription] = useState("")
    const [numberOfHero, setNumberOfHero] = useState(0)
    const [wage, setWage] = useState("")
    const [localisation, setLocalisation] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const userData = useSelector((state) => state.userReducer)
    const errors = useSelector((state) => state.errorReducer.missionError)

    const dispatch = useDispatch()

    const handleMission = () => {
        async ()=> {
            if (message) {
                const data = new FormData()
                data.append("posterId", userData._id)
                data.append("description", description)
                data.append("numberOfHero", numberOfHero)
                data.append("wage", wage)
                data.append("geolocalisation", localisation)

                await dispatch(addMission(data))
                dispatch(getAllMissions())
                cancelMission()
            } else {
                alert("Vous n'avez pas donné toutes les informations")
            }
        }
    }

    const cancelMission = () => {
        setDescription("")
        setNumberOfHero(0)
        setWage("")
        setLocalisation("")
    }

    useEffect(() => {
        if (!isEmpty(userData))
        setIsLoading(false)
    }, [ userData, description, numberOfHero, wage, localisation])

  return (
    <div>
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
            <div className='mission-form'>
                <textarea name="description" id="description"
                placeholder='descriptif de la mission'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                />
                <input type="text" placeholder='Nombre de héros requis'
                onChange={(e) => setNumberOfHero(e.target.value)}
                value={numberOfHero} />

                <input type="text" placeholder='Prime'
                onChange={(e) => setWage(e.target.value)}
                value={wage} />

                <input type="text" placeholder='Localisation'
                onChange={(e) => setLocalisation(e.target.value)}
                value={localisation} />

                <div>
                    <button onClick={cancelMission}>Annuler la mission</button>
                </div>

                <button onClick={handleMission}>Poster</button>


            </div>
        </>
      )}
    </div>
  )
}
