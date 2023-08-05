import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { CallApi } from './Utils/GlobalUtils';
import { CookiesExpireDays } from './Utils/GlobalConstants';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from 'react-router-dom';

import MainRouteElement from './RouteElements/MainRouteElement';
import RegisterRouteElement from './RouteElements/RegisterRouteElement';
import ConfirmEmailRouteElement from './RouteElements/ConfirmEmailRouteElement';
import SelectTrainingRouteElement from './RouteElements/SelectTrainingRouteElement';
import ConfigureTrainingRouteElement from './RouteElements/ConfigureTrainingRouteElement';
import ReturnToMainPage from './ReturnToMainPage';

function App() {
    let [firstLoadingIsCompleted, setFirstLoadingIsCompleted] = useState(false);

    let [currentUser, setCurrentUser] = useState({
        isUserLogging: false,
        isUserLogged: false,
        userLogin: null,
        accessToken: null,
        isLoggingError: false,
        loggingErrorMessage: null,
        isEmailConfirmationRequired: false
    });

    let [emailSendingState, setEmailSendingState] = useState({
        isModeActive: false,
        accessToken: null,
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null
    });

    let [emailConfirmationState, setEmailConfirmationState] = useState({
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null
    });

    useEffect(() => {
        try {
            if (!currentUser.isUserLogged && window.location.pathname == '/confirm_email') {
                setFirstLoadingIsCompleted(true);
                const urlParams = new URLSearchParams(window.location.search);
                const confirmRegistrationFunc = async () => await confirmRegistration(setEmailConfirmationState, urlParams.get('user'), urlParams.get('code'));

                confirmRegistrationFunc().catch(console.error);
            }
            else {
                const accessTokenFromCookies = getAccessTokenFromCookies();
                if (accessTokenFromCookies != null && accessTokenFromCookies != "") {
                    const userLoginFromCookies = getUserLoginFromCookies();

                    const refreshCurrentUserFunc = async () => {
                        try {
                            const response =
                                await CallApi("/Account/Check", "GET", accessTokenFromCookies);

                            if (response.ok) {
                                setCurrentUser({
                                    isUserLogged: true,
                                    isUserLogging: false,
                                    userLogin: userLoginFromCookies,
                                    accessToken: accessTokenFromCookies,
                                    isLoggingError: false,
                                    loggingErrorMessage: null,
                                    isEmailConfirmationRequired: false
                                });
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
    }, []);

    let header = (window.location.pathname == '/Register' || window.location.pathname == '/confirm_email' || currentUser.isUserLogged) && (<Header
        userIsLogged={currentUser.isUserLogged}
        userLogin={currentUser.userLogin}
        handleLogOut={() => logOut(currentUser, setCurrentUser, setEmailConfirmationState)}
    />);

    if (!firstLoadingIsCompleted) {
        return (<div>Loading...</div>);
    }
    else {
        return (
            <div className="App">
                {header}
                <section className="App-body">
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <MainRouteElement
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                        emailConfirmationState={emailConfirmationState}
                                        setEmailConfirmationState={setEmailConfirmationState}
                                        emailSendingState={emailSendingState}
                                        handleLogIn={(login, password) => logIn(login, password, setCurrentUser, setEmailSendingState)}
                                        setEmailSendingState={setEmailSendingState}
                                    />
                                }
                            />
                            <Route
                                path="register"
                                element={
                                    <RegisterRouteElement
                                        currentUser={currentUser}
                                        setEmailSendingState={setEmailSendingState}
                                    />
                                }
                            />
                            {!currentUser.isUserLogged && (
                                <Route
                                    path="confirm_email"
                                    element={
                                        <ConfirmEmailRouteElement
                                            currentUser={currentUser}
                                            emailConfirmationState={emailConfirmationState}
                                        />
                                    }
                                />
                            )}
                            {currentUser.isUserLogged && (
                                <Route
                                    path="train/select"
                                    element={
                                        <SelectTrainingRouteElement currentUser={currentUser} />
                                    }
                                />
                            )}
                            {currentUser.isUserLogged && (
                                <Route
                                    path="train/configure"
                                    element={
                                        <ConfigureTrainingRouteElement currentUser={currentUser} />
                                    }
                                />
                            )}
                            <Route
                                path="*"
                                status={404}
                                element={
                                    <MainRouteElement
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                        emailConfirmationState={emailConfirmationState}
                                        setEmailConfirmationState={setEmailConfirmationState}
                                        emailSendingState={emailSendingState}
                                        handleLogIn={(login, password) => logIn(login, password, setCurrentUser, setEmailSendingState)}
                                    />
                                }
                            />
                        </Routes>
                    </Router>
                </section>
                <Footer />
            </div>);
    }
}

async function logIn(login, password, setCurrentUser, setEmailSendingState) {
    try {
        setCurrentUser({
            isUserLogged: false,
            isUserLogging: true,
            userLogin: null,
            accessToken: null,
            isLoggingError: false,
            loggingErrorMessage: null,
            resultUserId: null,
            isEmailConfirmationRequired: false
        });

        const response =
            await CallApi("/Account/Token", "POST", null, JSON.stringify({ login, password }));

        if (response.ok) {
            const result = await response.json();

            if (result.isEmailConfirmed) {
                let expirationDate1 = new Date();
                expirationDate1.setDate(expirationDate1.getDate() + CookiesExpireDays);

                document.cookie = "accessToken=" + result.accessToken + "; expires=" + expirationDate1 + "; ";
                document.cookie = "userLogin=" + result.login + "; expires=" + expirationDate1 + "; ";

                setCurrentUser({
                    isUserLogged: true,
                    isUserLogging: false,
                    userLogin: result.login,
                    accessToken: result.accessToken,
                    isLoggingError: false,
                    loggingErrorMessage: null,
                    isEmailConfirmationRequired: !result.isEmailConfirmed
                });
            }
            else {
                setCurrentUser({
                    isUserLogged: false,
                    isUserLogging: false,
                    userLogin: null,
                    accessToken: null,
                    isLoggingError: false,
                    loggingErrorMessage: null,
                    isEmailConfirmationRequired: !result.isEmailConfirmed
                });

                setEmailSendingState({
                    isModeActive: true,
                    accessToken: result.accessToken,
                    isExecuting: false,
                    isFinished: false,
                    isSucceed: false,
                    isError: false,
                    errorMessage: null,
                });
            }
        }
        else {
            const result = await response.json();
            setCurrentUser({
                isUserLogged: false,
                isUserLogging: false,
                userLogin: null,
                accessToken: null,
                isLoggingError: true,
                loggingErrorMessage: `${response.status} ${result.errorText}`,
                isEmailConfirmationRequired: false
            });
        }
    }
    catch (error) {
        console.log(error);
        setCurrentUser({
            isUserLogged: false,
            isUserLogging: false,
            userLogin: null,
            accessToken: null,
            isLoggingError: true,
            loggingErrorMessage: "Error: Unable to connect to the API",
            isEmailConfirmationRequired:false
        });
    }
}

async function logOut(currentUser, setCurrentUser, setEmailConfirmationState) {
    try {
        const response = await CallApi("/Account/Logout", "POST", currentUser.accessToken);
        if (response.ok) {
            setCurrentUser({
                isUserLogged: false,
                isUserLogging: false,
                userLogin: null,
                accessToken: null,
                isLoggingError: false,
                loggingErrorMessage: null,
                isEmailConfirmationRequired: false
            });

            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "userLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
        else {
            const result = await response.json();

            setCurrentUser({
                isUserLogged: false,
                isUserLogging: false,
                userLogin: null,
                accessToken: null,
                isLoggingError: true,
                loggingErrorMessage: `${response.status} ${result.errorText}`,
                isEmailConfirmationRequired: false
            });
        }

        setEmailConfirmationState({
            isExecuting: false,
            isFinished: false,
            isSucceed: false,
            isError: false,
            errorMessage: null
        });
    }
    catch (error) {
        console.log(error);
    }
}

function getAccessTokenFromCookies() {
    try {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            .split('=')[1];
        return cookieValue;
    }
    catch {
        return null;
    }
}

function getUserLoginFromCookies() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userLogin='))
        .split('=')[1];
    return cookieValue;
}

async function confirmRegistration(setEmailConfirmationState, userId, confirmationCode) {
    if (userId !== null || confirmationCode !== null) {
        try {
            setEmailConfirmationState({
                isExecuting: true,
                isFinished: false,
                isSucceed: false,
                isError: false,
                errorMessage: null
            });

            const response =
                await CallApi("/Account/ConfirmRegistration", "POST", null, JSON.stringify({ userId, confirmationCode }));

            if (response.ok) {
                setEmailConfirmationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: true,
                    isError: false,
                    errorMessage: null
                });
            }
            else {
                const result = await response.json();
                setEmailConfirmationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: false,
                    isError: true,
                    errorMessage: `${response.status} ${result.errorMessage}`,
                });
            }
        }
        catch (error) {
            console.log(error);
            setEmailConfirmationState({
                isExecuting: false,
                isFinished: true,
                isSucceed: false,
                isError: true,
                errorMessage: "Error: Unable to register user.",
            });
        }
    }
    else {
        setEmailConfirmationState({
            isExecuting: false,
            isFinished: true,
            isSucceed: false,
            isError: true,
            errorMessage: "Error: userId and confirmationCode must not be null."
        });
    }
}

export default App;
