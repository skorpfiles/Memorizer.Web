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
    Navigate
} from 'react-router-dom';
import AuthenticationPage from './Pages/Authentication/AuthenticationPage';
import RegisterPage from './Pages/Authentication/RegisterPage';
import MainPage from './Pages/MainPage';
import ConfirmEmailPage from './Pages/Authentication/ConfirmEmailPage';
import WeSentEmailPage from './Pages/Authentication/WeSentEmailPage';
import SendConfirmationEmailPage from './Pages/Authentication/SendConfirmationEmailPage';

function App() {
    let [currentUser, setCurrentUser] = useState({
        isUserLogging: false,
        isUserLogged: false,
        userLogin: null,
        accessToken: null,
        isLoggingError: false,
        loggingErrorMessage: null
    });
    let [emailConfirmation, setEmailConfirmation] = useState({
        showMessageAboutSending: false,
        isModeActive: false,
        isFinished: false,
        isSucceed: false
    });

    let [registrationState, setRegistrationState] = useState({
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null,
        resultUserId: null,
        isConfirmationRequired: false
    });


    let [loggingHasBeenChecked, setLoggingHasBeenChecked] = useState(false);


    useEffect(() => {
        try {
            if (!loggingHasBeenChecked) {
                const accessTokenFromCookies = getAccessTokenFromCookies();
                if (accessTokenFromCookies != null && accessTokenFromCookies != "") {
                    const userLoginFromCookies = getUserLoginFromCookies();

                    const refreshCurrentUserFunc = async () => {
                        const response =
                            await CallApi("/Account/Check", "GET", accessTokenFromCookies);

                        if (response.ok) {
                            setCurrentUser({
                                isUserLogged: true,
                                isUserLogging: false,
                                userLogin: userLoginFromCookies,
                                accessToken: accessTokenFromCookies,
                                isLoggingError: false,
                                loggingErrorMessage: null
                            });
                        }

                        
                    }

                    refreshCurrentUserFunc().catch(console.error);
                }
            }
            
        }
        catch {
            
        }
        setLoggingHasBeenChecked(true);
    })

    let header = (window.location.pathname == '/Register' || window.location.pathname == '/confirm_email' || currentUser.isUserLogged) && (<Header
        userIsLogged={currentUser.isUserLogged}
        userLogin={currentUser.userLogin}
        handleLogOut={()=>logOut(currentUser, setCurrentUser)}
    />);

    let mainPage = currentUser.isUserLogged ?
        (
            <MainPage />
        ) :
        (
            <AuthenticationPage
                handleLogIn={(login, password) => logIn(login, password, setCurrentUser)}
                currentUser={currentUser}
                emailConfirmation={emailConfirmation }
            />
        );

    return (
        <div className="App">
            {header}
            <section className="App-body">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={mainPage}
                        />
                        {(!currentUser.isUserLogged && !registrationState.isSucceed) && (
                            <Route
                                path="register"
                                element={
                                    <RegisterPage
                                        currentUser={currentUser}
                                        registrationState={registrationState}
                                        handleRegister={(email,login,password,repeatPassword) => registerUser(setRegistrationState, setEmailConfirmation, email, login, password, repeatPassword) }
                                    />
                                }
                            />
                        )}
                        {(!currentUser.isUserLogged && registrationState.isSucceed && emailConfirmation.showMessageAboutSending) && (
                            <Route
                                path="register"
                                element={
                                    <WeSentEmailPage/>
                                }
                            />
                        )}
                        {(!currentUser.isUserLogged && registrationState.isSucceed && !emailConfirmation.showMessageAboutSending) && (
                            <Route
                                path="register"
                                element={
                                    <Navigate replace to="/" />
                                }
                            />
                        )}
                        {!currentUser.isUserLogged && (
                            <Route
                                path="confirm_email"
                                element={
                                    <ConfirmEmailPage
                                    handleLogIn={(login, password) => logIn(login, password, setCurrentUser)}
                                    currentUser={currentUser}
                                    />
                                }
                            />
                        )}
                        <Route
                            path="test"
                            element={<SendConfirmationEmailPage />}
                            />
                        <Route
                            path="*"
                            status={404}
                            element={mainPage}
                        />
                    </Routes>
                </Router>
            </section>
            <Footer />
        </div>
    );
}

async function logIn(login, password, setCurrentUser) {
    try {
        setCurrentUser({
            isUserLogged: false,
            isUserLogging: true,
            userLogin: null,
            accessToken: null,
            isLoggingError: false,
            loggingErrorMessage: null,
            resultUserId: null,
            isConfirmationRequired: false
        });

        const response =
            await CallApi("/Account/Token", "POST", null, JSON.stringify({ login, password }));

        if (response.ok) {
            const result = await response.json();

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
                loggingErrorMessage: null
            });
        }
        else {
            const result = await response.json();

            if (response.status == 401) {
                setCurrentUser({
                    isUserLogged: false,
                    isUserLogging: false,
                    userLogin: null,
                    accessToken: null,
                    isLoggingError: true,
                    loggingErrorMessage: result.errorText
                });
                if (result.errorCode == "EmailNotConfirmed") {

                }
            }
            else {
                setCurrentUser({
                    isUserLogged: false,
                    isUserLogging: false,
                    userLogin: null,
                    accessToken: null,
                    isLoggingError: true,
                    loggingErrorMessage: `${response.status} ${result.errorText}`
                });
            }
            
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
            loggingErrorMessage: "Error: Unable to connect to the API"
        });
    }
}

async function logOut(currentUser, setCurrentUser) {
    try {
        const response = await CallApi("/Account/Logout", "POST", currentUser.accessToken);
        if (response.ok) {
            setCurrentUser({
                isUserLogged: false,
                isUserLogging: false,
                userLogin: null,
                accessToken: null,
                isLoggingError: false,
                loggingErrorMessage: null
            });

            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "userLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
        else {
            const result = await response.json();

            setCurrentUser({
                isUserLogging: false,
                isLoggingError: true,
                loggingErrorMessage: `${response.status} ${result.errorText}`
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

function getAccessTokenFromCookies() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        .split('=')[1];
    return cookieValue;
}

function getUserLoginFromCookies() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('userLogin='))
        .split('=')[1];
    return cookieValue;
}

async function registerUser(setRegistrationState, setEmailConfirmation, email, login, password, repeatPassword, captchaToken) {

    if (password === repeatPassword) {

        try {
            setRegistrationState({
                isExecuting: true,
                isFinished: false,
                isSucceed: false,
                isError: false,
                errorMessage: null,
                resultUserId: null,
                isConfirmationRequired: false
            });

            const response =
                await CallApi("/Account/Register", "PUT", null, JSON.stringify({ email, login, password, captchaToken }));

            const result = await response.json();

            if (response.ok) {
                setRegistrationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: true,
                    isError: false,
                    errorMessage: null,
                    resultUserId: result.userId,
                    isConfirmationRequired: result.isConfirmationRequired
                });

                if (result.isConfirmationRequired) {
                    setEmailConfirmation({
                        showMessageAboutSending: true,
                        isModeActive: false,
                        isFinished: false,
                        isSucceed: false
                    });
                }
            }
            else {
                setRegistrationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: false,
                    isError: true,
                    errorMessage: `${response.status} ${result.errorMessage}`,
                    resultUserId: null,
                    isConfirmationRequired: false
                });
            }
        }
        catch (error) {
            console.log(error);
            setRegistrationState({
                isExecuting: false,
                isFinished: true,
                isSucceed: false,
                isError: true,
                errorMessage: "Error: Unable to register user.",
                resultUserId: null,
                isConfirmationRequired: false
            });
        }
    }
    else {
        setRegistrationState({
            isExecuting: false,
            isFinished: true,
            isSucceed: false,
            isError: true,
            errorMessage: "Error: Password and Repeat Password don't match.",
            resultUserId: null,
            isConfirmationRequired: false
        });
    }
}


export default App;
