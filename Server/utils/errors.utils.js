module.exports.signUpErrors = (err) => {
    let errors = { name:"", email:"", password:"mauvais mot de passe"}

    if(err.message.includes("name"))
    errors.name = "Ce nom est incorrect, ou déjà pris"

    if(err.message.includes("email"))
    errors.email = "Email incorrect"

    if(err.message.includes("password"))
    errors.password = "mot de passe trop court, minimum 6 caractères"

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
    errors.name = "Ce nom est déjà pris"

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Ce mail est déjà pris"

    return errors

}
