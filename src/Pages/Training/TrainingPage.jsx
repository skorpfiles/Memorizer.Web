import QASpace from '../../Training/QASpace';
import ResponseSpace from '../../Training/ResponseSpace';
import ControlPanel from '../../Training/ControlPanel';

function TrainingPage(props) {
    return (
        <div className='flex-all-free-space column'>
            <QASpace/>
            <ResponseSpace
                questionsIsLoading={props.questionsIsLoading}
                questionsLoadingError={props.questionsLoadingError}
            />
            <ControlPanel/>
        </div>
    )
}

export default TrainingPage;