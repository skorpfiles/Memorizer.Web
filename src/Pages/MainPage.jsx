import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    useEffect(() => {
        document.title = 'Memorizer';
    });

    const navigate = useNavigate();

    return (
        <section className='middle-vertical-align-container'>
            <div className='middle-vertical-align-block column-small'>
                <header className='title-before-panel font--main-for-labels'>
                    What do you want to do?
                </header>
                <div className='main-control-container display-flex'>
                    <button className='main-button border-radius-small full-width central-button--small-width font--main-for-controls increased-button-height' onClick={() => navigate('/train/select') }>Train questions</button>
                </div>
                <div className='main-control-container display-flex'>
                    <button className='main-button border-radius-small full-width central-button--small-width font--main-for-controls' onClick={() => window.open(process.env.REACT_APP_MANAGEMENT_URL, '_blank') }>Manage questionnaires</button>
                </div>
            </div>
        </section>
    );
}

export default MainPage;