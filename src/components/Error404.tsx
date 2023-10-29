import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg' 
const Error404 = () => {
    return (
        <div className="app app-404-page">

            <div className="container mb-5" style={{margin:'50px'}}>
                <div className="row">
                    <div className="col-12 col-md-11 col-lg-7 col-xl-6 mx-auto">
                        <div className="app-branding text-center mb-5">
                            <Link to="/"><div className="app-logo"><img className="logo-icon me-2" src={logo} alt="logo" width={70} /></div></Link>

                        </div>
                        <div className="app-card text-center shadow-sm">
                            <h1 className="page-title mb-4">404<br /><span className="font-weight-light">Page Not Found</span></h1>
                            <div className="mb-4">
                                Sorry, we can't find the page you're looking for.
                            </div>
                            <Link to="/"> <a className="btn app-btn-primary mb-4" >Go to home page</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Error404;