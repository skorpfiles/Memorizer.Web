import QuickTrainingsListPanel from '../../ConfigureTraining/Quick/QuickTrainingsListPanel';
import { useNavigate } from 'react-router-dom';

function SelectTrainingPage() {

    const navigate = useNavigate();

    return (
        <section className='middle-vertical-align-container vertical-center-column'>
            <div className='title-before-panel font--main-for-labels'>
                Select a training you've trained recently
            </div>
            <QuickTrainingsListPanel/>
            <div className='title-between-panels font--main-for-labels'>
                Or you can start a new training
            </div>
            <div className='display-flex'>
                <button className='main-button border-radius-big full-width central-button--small-width font--main-for-controls' onClick={() => navigate('/train/configure') }>Create new training</button>
            </div>
        </section>
    );
}

export default SelectTrainingPage;