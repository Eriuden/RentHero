import React, {useState} from 'react';
import axios from "axios"

export default function ConnexionForm() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = (e)=>{
    e.preventDefault()
    const emailError = document.querySelector(".email .error")
    const passwordError = document.querySelector(".password .error")

    axios({
      method:"post",
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials:true,
      data: {
        email,
        password,
      },
    })
    .then((res)=> {
      if(res.data.errors) {
        emailError.innerHTML = res.data.errors.email
        password.innerHTML = res.data.errors.password 
      } else {
        window.location = "/"
      }
    })
    .catch((err) => {
      console.log(err)
    })

  }
  return (
    <div>
      <form action="" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br/>

        <input type="text" name='email' id='email'
        onChange={ (e) => setEmail (e.target.value)}
        value={email}           
        />
        <div className='email error'></div>

        <br/>

        <input type="password" name='password' id='password'
        onChange={ (e) => setPassword (e.target.value)}
        value={password} />

        <div className='password error'></div>

        <br/>

        <input type="submit" value="connexion" />

      </form>
    </div>
  )
}
