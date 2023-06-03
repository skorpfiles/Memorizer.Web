import { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { CallApi } from './Utils/GlobalUtils';
import { CookiesExpireDays } from './Utils/GlobalConstants';

function App() {
    let [currentUser, setCurrentUser] = useState({
        isUserLogging: false,
        isUserLogged: false,
        userLogin: null,
        accessToken: null,
        isLoggingError: false,
        loggingErrorMessage: null
    });
 
    return (
        <div className="App">
            <Header
                userIsLogged={false}
                userLogin="Test User"
            />
            <section className="App-body">
            </section>
            <Footer/>
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

export default App;
