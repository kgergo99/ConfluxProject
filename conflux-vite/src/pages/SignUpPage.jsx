import SignupWindow from "../modules/SignupWindow"
import TopBarSimple from "../modules/TopBarSimple"
import './signuppage.css'

function SignUpPage() {

    return (
        <div className="userlog-container">
            <div className="header">
                <TopBarSimple />
            </div>
            <div className="input-area d-flex align-items-center justify-content-center">
                <SignupWindow/>
            </div>
            
        </div>
    )
}

export default SignUpPage