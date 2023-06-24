import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { CallApi } from './Utils/GlobalUtils';
import { CookiesExpireDays } from './Utils/GlobalConstants';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import AuthenticationPage from './Pages/Authentication/AuthenticationPage';
import RegisterPage from './Pages/RegisterPage';
import MainPage from './Pages/MainPage';

function App() {
    let [currentUser, setCurrentUser] = useState({
        isUserLogging: false,
        isUserLogged: false,
        userLogin: null,
        accessToken: null,
        isLoggingError: false,
        loggingErrorMessage: null
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

                    refreshCurrentUserFunc();
                }
            }
            
        }
        catch {
            
        }
        setLoggingHasBeenChecked(true);
    })

    let header = (window.location.pathname == '/Register' || currentUser.isUserLogged) && (<Header
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
                currentUser={ currentUser }
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
                        {!currentUser.isUserLogged && (
                            <Route
                                path="register"
                                element={
                                    <RegisterPage
                                        currentUser={ currentUser }
                                    />
                                }
                            />
                        )}
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
            loggingErrorMessage: null
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
                    loggingErrorMessage: "Invalid login or password."
                });
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

export default App;
