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

    let [registrationState, setRegistrationState] = useState({
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null,
        resultUserId: null,
        isConfirmationRequired: false
    });

    useEffect(() => {
        try {
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
                            loggingErrorMessage: null,
                            isEmailConfirmationRequired: false
                        });
                    }

                }

                refreshCurrentUserFunc().catch(console.error);
            }

            if (!currentUser.isUserLogged && window.location.pathname == '/confirm_email') {
                const urlParams = new URLSearchParams(window.location.search);
                const confirmRegistrationFunc = async () => await confirmRegistration(setEmailConfirmationState, urlParams.get('user'), urlParams.get('code'));

                confirmRegistrationFunc().catch(console.error);
            }
        }
        catch {

        }
    }, []);

    let header = (window.location.pathname == '/Register' || window.location.pathname == '/confirm_email' || currentUser.isUserLogged) && (<Header
        userIsLogged={currentUser.isUserLogged}
        userLogin={currentUser.userLogin}
        handleLogOut={()=>logOut(currentUser, setCurrentUser)}
    />);

    let mainPage;

    if (currentUser.isUserLogged) {
        mainPage = (
            <MainPage />
        );
    }
    else {
        if (!emailSendingState.isModeActive) {
            mainPage = (
                <AuthenticationPage
                    handleLogIn={(login, password) => logIn(login, password, setCurrentUser, setEmailSendingState)}
                    currentUser={currentUser}
                    emailConfirmation={emailConfirmationState}
                />
            );
        }
        else {
            if (!emailSendingState.isFinished) {
                mainPage = (
                    <SendConfirmationEmailPage
                        emailSendingState={emailSendingState}
                        handleSendingEmail={()=>sendConfirmationEmail(setEmailSendingState, emailSendingState.accessToken) }
                    />
                );
            }
            else {
                mainPage = (
                    <WeSentEmailPage/>
                );
            }
        }
    }

    let registerPage;

    if (!currentUser.isUserLogged) {
        if (!registrationState.isSucceed) {
            registerPage = (
                <RegisterPage
                    currentUser={currentUser}
                    registrationState={registrationState}
                    handleRegister={(email, login, password, repeatPassword) => registerUser(setRegistrationState, setEmailSendingState, email, login, password, repeatPassword)}
                />
            );
        }
        else {
            if (registrationState.isConfirmationRequired) {
                registerPage = (
                    <WeSentEmailPage />
                );
            }
            else {
                registerPage = (
                    <Navigate replace to="/" />
                );
            }
        }
    }

    let confirmEmailPage;

    if (!currentUser.isUserLogged) {
        if (!emailConfirmationState.isFinished) {
            confirmEmailPage = (
                <ConfirmEmailPage
                    handleConfirmRegistration={(userId, confirmationCode) => confirmRegistration(setEmailSendingState, userId, confirmationCode)}
                />
            );
        }
        else {
            confirmEmailPage = (
                <Navigate replace to="/" />
            );
        }
    }

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
                        <Route
                            path="register"
                            element={registerPage}
                        />
                        {!currentUser.isUserLogged && (
                            <Route
                                path="confirm_email"
                                element={confirmEmailPage}
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

async function registerUser(setRegistrationState, setEmailSendingState, email, login, password, repeatPassword, captchaToken) {

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
                    setEmailSendingState({
                        isModeActive: false,
                        accessToken: null,
                        isExecuting: false,
                        isFinished: true,
                        isSucceed: true,
                        isError: false,
                        errorMessage: null
                    });
                }
            }
            else {
                setRegistrationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: false,
                    isError: true,
                    errorMessage: `${response.status} ${result.errorText}`,
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

async function sendConfirmationEmail(setEmailSendingState, accessToken) {
    try {
        setEmailSendingState({
            isModeActive: true,
            accessToken,
            isExecuting: true,
            isFinished: false,
            isSucceed: false,
            isError: false,
            errorMessage: null
        });

        const response =
            await CallApi("/Account/RepeatEmailConfirmation", "POST", accessToken);

        if (response.ok) {
            setEmailSendingState({
                isModeActive: true,
                accessToken,
                isExecuting: false,
                isFinished: true,
                isSucceed: true,
                isError: false,
                errorMessage: null
            });
        }
        else {
            const result = await response.json();
            setEmailSendingState({
                isModeActive: true,
                accessToken,
                isExecuting: false,
                isFinished: true,
                isSucceed: false,
                isError: true,
                errorMessage: `${response.status} ${result.errorText}`
            });
        }
    }
    catch (error) {
        setEmailSendingState({
            isModeActive: true,
            accessToken,
            isExecuting: false,
            isFinished: true,
            isSucceed: false,
            isError: true,
            errorMessage: "Error: Unable to send confirmation email"
        });
    }
}

export default App;
