import Navbar from "../modules/Navbar"
import "./startpage.css"
import './signuppage.css'
import LoginWindow from "../modules/LoginWindow"
import TopBarSimple from "../modules/TopBarSimple"
import SignupWindow from "../modules/SignupWindow"
import Ellipse_01 from "../assets/login_assets/ellipse_01.svg"
import Ellipse_02 from "../assets/login_assets/ellipse_02_fit.svg"
import DotGraph from "../assets/login_assets/dot_graph.svg"

function StartPage() {
    return (
        <div className="userlog-container">
            <div className="header">
                <TopBarSimple />
            </div>
            <div className="input-area d-flex align-items-center justify-content-center">
                <LoginWindow />
            </div>
        </div>
    )
}

export default StartPage
