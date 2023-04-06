import ForgotPasswordForm from "../modules/ForgotPasswordForm"
import TopBarSimple from "../modules/TopBarSimple"
import './signuppage.css'

function ForgotPasswordPage() {

    return(
        <div className="userlog-container">
            <div className="header">
                <TopBarSimple />
            </div>
            <div className="input-area d-flex align-items-center justify-content-center">
                <ForgotPasswordForm/>
            </div>
        </div>
    )
}

export default ForgotPasswordPage