import RegisterPanel from '../../UserManagement/RegisterPanel'
import { useEffect } from 'react';

function RegisterPage(props) {
    useEffect(() => {
        document.title = 'Register User - Memorizer';
    });
    return (
        <div className='middle-vertical-align-container'>
            <section className='middle-vertical-align-block column-small'>
                <header className='title-before-panel font--main-for-labels'>
                        Register a new account
                </header>
                <RegisterPanel
                    registrationState={props.registrationState}
                    handleRegister={props.handleRegister}
                />
            </section>
        </div>
    )
}

export default RegisterPage;