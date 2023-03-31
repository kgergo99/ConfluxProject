import Navbar from "../modules/Navbar"
import "./startpage.css"
import LoginWindow from "../modules/LoginWindow"
import SignupWindow from "../modules/SignupWindow"
import Ellipse_01 from "../assets/login_assets/ellipse_01.svg"
import Ellipse_02 from "../assets/login_assets/ellipse_02_fit.svg"
import DotGraph from "../assets/login_assets/dot_graph.svg"

function StartPage() {
    return (
        <div className="start-page-container">
            <img className="dot-graph" src={DotGraph} alt="svg"></img>
            <div className="login-window-container input-element">
                <LoginWindow />
            </div>
            <img className="top-ellipse top-element" src={Ellipse_02} alt="svg"></img>
            <img className="bottom-ellipse" src={Ellipse_02} alt="svg"></img>
            <h1 className="login-header bottom-element">CONFLUX</h1>
        </div>
    )
}

export default StartPage
