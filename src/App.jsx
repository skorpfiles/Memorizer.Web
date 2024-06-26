import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { callApi, getAccessTokenFromCookies, getUserLoginFromCookies } from './Utils/GlobalUtils';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import MainRouteElement from './RouteElements/MainRouteElement';
import RegisterRouteElement from './RouteElements/RegisterRouteElement';
import ConfirmEmailRouteElement from './RouteElements/ConfirmEmailRouteElement';
import SelectTrainingRouteElement from './RouteElements/SelectTrainingRouteElement';
import ConfigureTrainingRouteElement from './RouteElements/ConfigureTrainingRouteElement';

import { userActions } from './ReduxStore/user';
import { emailConfirmationStateActions } from './ReduxStore/emailConfirmationState';
import { useDispatch, useSelector } from 'react-redux';

import { confirmRegistration } from './Utils/authentication';
import TrainingRouteElement from './RouteElements/TrainingRouteElement';

function App() {
    const [firstLoadingIsCompleted, setFirstLoadingIsCompleted] = useState(false);

    const dispatch = useDispatch();
    const isUserLogged = useSelector(state => state.user.isUserLogged);

    useEffect(() => {
        try {
            if (!isUserLogged && window.location.pathname === '/confirm_email') {
                setFirstLoadingIsCompleted(true);
                const urlParams = new URLSearchParams(window.location.search);
                const confirmRegistrationFunc = async () => await confirmRegistration(urlParams.get('user'), urlParams.get('code'), dispatch, emailConfirmationStateActions);

                confirmRegistrationFunc().catch(console.error);
            }
            else if (!isUserLogged) {
                const accessTokenFromCookies = getAccessTokenFromCookies();
                if (accessTokenFromCookies != null && accessTokenFromCookies !== '') {
                    const userLoginFromCookies = getUserLoginFromCookies();

                    const refreshCurrentUserFunc = async () => {
                        try {
                            const response =
                                await callApi('/Account/Check', 'GET', accessTokenFromCookies);

                            if (response.ok) {
                                dispatch(userActions.setAuthenticationIsSuccessful({
                                    userLogin: userLoginFromCookies,
                                    accessToken: accessTokenFromCookies,
                                    isEmailConfirmationRequired: false
                                }));

                            }
                            setFirstLoadingIsCompleted(true);
                        }
                        catch(ex) {
                            setFirstLoadingIsCompleted(true);
                            throw ex;
                        }
                    }

                    refreshCurrentUserFunc().catch(console.error);
                }
                else {
                    setFirstLoadingIsCompleted(true);
                }
            }

        }
        catch {
            setFirstLoadingIsCompleted(true);
        }
    }, [dispatch, isUserLogged]);

    let header = (window.location.pathname === '/Register' || window.location.pathname === '/confirm_email' || isUserLogged) && (<Header />);

    if (!firstLoadingIsCompleted) {
        return (<div>Loading...</div>);
    }
    else {
        return (
            <div className='app'>
                {header}
                <main className='app-body'>
                    <Router>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <MainRouteElement />
                                }
                            />
                            <Route
                                path='register'
                                element={
                                    <RegisterRouteElement/>
                                }
                            />
                            {!isUserLogged && (
                                <Route
                                    path='confirm_email'
                                    element={
                                        <ConfirmEmailRouteElement/>
                                    }
                                />
                            )}
                            {isUserLogged && (
                                <Route
                                    path='train/select'
                                    element={
                                        <SelectTrainingRouteElement/>
                                    }
                                />
                            )}
                            {isUserLogged && (
                                <Route
                                    path='train/configure'
                                    element={
                                        <ConfigureTrainingRouteElement/>
                                    }
                                />
                            )}
                            {isUserLogged && (
                                <Route
                                    path='train'
                                    element={
                                        <TrainingRouteElement />
                                    }
                                />
                            )}
                            <Route
                                path='*'
                                status={404}
                                element={
                                    <MainRouteElement/>
                                }
                            />
                        </Routes>
                    </Router>
                </main>
                <Footer />
            </div>);
    }
}

export default App;
