// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from 'axios'
import url from './url_config'
import auth from './service/index'
import onChange from './App'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);

      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
        console.log("isAuth : ", isAuthenticated);
        console.log("User: ", user);

        let userToken = auth.getToken()
        console.log("GET TOKEN", userToken);

        // if (userToken === null) {
        //   const dataLogin = {
        //     "facebook": true,
        //     "email": user.email,
        //     "facebook_id": user.sub,
        //     "firstname": user.given_name,
        //     "lastname": user.family_name,
        //   }
        //   axios.post(`${url}/users/login`, dataLogin).then(async res => {
        //     const { data } = res
        //     console.log("Data ", data);
        //     if (data.token != undefined) {
        //       await localStorage.setItem('token', data.token)
        //       // await onChange.onUserChanged(data.token);
        //       // this.props.history.push(`/`)
        //     } else {
        //       alert(`${data.token}`)
        //       await auth.clearToken()
        //     }
        //   })
        // }

        // let userDecoded = auth.decodeToken(user)
        // let userId = userDecoded.id
        // let userFirstName = userDecoded.firstname
        // let userLastName = userDecoded.lastname
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);

  };

  const handleRedirectCallback = async () => {

    setLoading(true);
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser();

    setLoading(false);
    setIsAuthenticated(true);
    setUser(user)
    console.log("user", user);

  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};