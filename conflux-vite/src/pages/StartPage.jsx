import Navbar from "../modules/Navbar"
import LoginWindow from "../modules/LoginWindow"
import SignupWindow from "../modules/SignupWindow"

function StartPage() {
    return (
        <div>
            <Navbar />
            <h1 style={{color: "white"}}>Start Page</h1>
            <LoginWindow />
        </div>
    )
}

export default StartPage
