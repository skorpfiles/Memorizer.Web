import QASpace from '../../Training/QASpace';
import ResponseSpace from '../../Training/ResponseSpace';
import ControlPanel from '../../Training/ControlPanel';
function TrainingPage() {
    return (
        <div className='flex-all-free-space' style={{ "display": "flex", "flexDirection":"column" }} >
            <QASpace />
            <ResponseSpace />
            <ControlPanel />
        </div>
    )
}

export default TrainingPage;