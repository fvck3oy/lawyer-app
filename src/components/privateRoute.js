import React, { Component, useEffect} from 'react'
import auth from '../service/index'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { useAuth0 } from "../react-auth0-spa";

// const PrivateRoute = ({ component: Component, path, ...rest }) => {
//   const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

//   useEffect(() => {
//     if (loading || isAuthenticated) {
//       return;
//     }
//     const fn = async () => {
//       await loginWithRedirect({
//         appState: { targetUrl: path }
//       });
//     };
//     fn();
//   }, [loading, isAuthenticated, loginWithRedirect, path]);

//   const render = props =>
//     isAuthenticated === true ? <Component {...props} /> : null;

//   return <Route path={path} render={render} {...rest} />;
// };
// export default PrivateRoute;

export class PrivateRoute extends Component {
	isAuthen = () => {
		let token = auth.getToken()
		let user = auth.decodeToken(token)

		if (auth.isExpiredToken(token)) {
			user = null
		}

		return !!(token && user)
	}
	render() {
		const isAuthenticated = this.isAuthen()
		const { component: InnerComponent, ...rest } = this.props
		const { location } = this.props

		return (
			<Route
				{...rest}
				render={props => (isAuthenticated ? <InnerComponent {...props} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
			/>
		)
	}
}
export default withRouter(PrivateRoute)

