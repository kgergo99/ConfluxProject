
export default function errorSetter(err){
    switch(err.code) {
        case "auth/missing-email":
          return("Please give us the email adress");
          break;
        case "auth/user-not-found":
          return("Email address not found");
          break;
        case "auth/wrong-password":
            return("Invalid Email or Password");
        case "auth/invalid-email":
            return("Invalid Email");
        case "auth/popup-closed-by-user":
            return("");
        default:
          return(err.message);
          break;
      }
}