import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    useEffect(() => {
        document.title = 'Memorizer';
    });

    const navigate = useNavigate();

    return (
        <div className='middle-vertical-align-container'>
            <div className='middle-vertical-align-block column-small'>
                <div className='title-before-panel'>
                    <div className='font--main-for-labels'>
                        What do you want to do?
                    </div>
                </div>
                <div className='main-control-container display-flex'>
                    <button className='main-button border-radius-small full-width central-button--small-width font--main-for-controls increased-button-height' onClick={() => navigate('/train/select') }>Train questions</button>
                </div>
                <div className='main-control-container display-flex'>
                    <button className='main-button border-radius-small full-width central-button--small-width font--main-for-controls' onClick={() => window.open(process.env.REACT_APP_MANAGEMENT_URL, '_blank') }>Manage questionnaires</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;