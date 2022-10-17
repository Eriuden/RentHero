import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'

export default function Header() {
  const [hamburger, setHamburger] = useState(false)
  const uid = useContext(UidContext)
  const userData = useSelector((state)=> state.userReducer)

  return (
    <div>
            <h1>Rent Hero</h1>

            <nav className='hidden sm:flex'>
                <Link to={"/"}>Acceuil</Link>
                {uid ? (
                    <>
                    <h2>Bonjour {userData.name}</h2>
                    <Link to={"/profile:/id"}>Profil</Link>
                    </>
                ): (
                    <>
                    <Link to={"/connexion"}>Connexion</Link>
                    <Link to={"/inscription"}>Inscription</Link>
                    </>
                )}
                
                <Link to={"missionList"}>Liste des missions</Link>
            </nav>

            <h2 className='flex m-2 sm:hidden' onClick={()=>setHamburger(!hamburger)}>Cliquez ici</h2> 

        {hamburger ? (
            <nav className='sm: hidden'>
                <Link to={"/"}>Acceuil</Link>
                

                <Link to={"/connexion"}>Connexion</Link>
                <Link to={"/inscription"}>Inscription</Link>
                <Link to={"/profile:/id"}>Profil</Link>

                <Link to={"missionList"}>Liste des missions</Link>
            </nav>
        ):""}   
    </div>
  )
}
