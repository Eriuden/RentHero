import React , {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { updateUser } from '../redux/actions/users.actions';
import { UidContext } from '../Component/AppContext';
import { useContext } from 'react';
import { uploadPicture } from '../redux/actions/users.actions';


export default function HeroProfile() {

  const [file, setFile] = useState()
  const [bio, setBio] = useState('')
  const [name, setName] = useState('')
  const [updateForm, setUpdateForm] = useState(false)

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer.userError)


  const handleUpdate = () => {
    dispatch(updateUser(userData._id, bio, name))
    setUpdateForm(false)
  }

  const uid = useContext(UidContext)


  const handlePicture = (e) => {
    e.preventDefault()

    const date = new FormData()

    data.append("name" , userData.name)
    data.append("userId", userData._id)
    data.append("file", file)

    dispatch(uploadPicture(data, userData._id))
  }

  return (
    <div>

      {uid ? (
        <>
      <h1>Profil de {userData.name}</h1>

      <img src={userData.picture} alt="user-pic" />

      <form action="" onSubmit={handlePicture} className="uploadPicture">
        <label htmlFor="file">Changer d'image</label>
        <input type="file" id="file" name="file"
          accept='.jpg, .jpeg, .png'
          onChange={(e) => setFile((e)=> setFile(e.target.files[0]))}
        />
        <br/>
        <input type="submit" value="envoyer" />
      </form>

      <p>{error.maxSize}</p>
      <p>{error.format}</p>

      <h3>Bio</h3>
      {updateForm === false && (
        <>
          <h2 onClick={() => setUpdateForm(!updateForm)}>{userData.name}</h2>
          <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
          <button onClick={() => setUpdateForm(!updateForm)}>Modifier vos infos</button>
        </>
      )}

      { updateForm && (
        <>
          <input type="text" defaultValue={userData.name}onChange={(e)=>setName(e.target.value)} />
          <input type="text" defaultValue={userData.bio}onChange={(e)=>setBio(e.target.value)} />
        
          <button onClick={handleUpdate}>Valider les modifications</button>
        </>
      )}

      </>
      ) : (
        <h2>Ce n'est pas votre profil</h2>
      )}
      
    </div>  
  )
}
