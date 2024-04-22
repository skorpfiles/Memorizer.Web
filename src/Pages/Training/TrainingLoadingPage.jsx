import '../../Training/TrainingSpace.css';
import LoadingAnimation from '../../Training/LoadingAnimation';
function TrainingLoadingPage() {
    return (
        <div className='column middle-vertical-align-block' style={{"alignItems":"center"}}>
            <div className='font--main-for-small-labels' style={{ "margin": "1rem" }}>Loading, please wait...</div>
            <LoadingAnimation/>
        </div>
    );
}

export default TrainingLoadingPage;