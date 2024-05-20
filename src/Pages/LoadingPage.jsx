import LoadingWidget from '../Controls/LoadingWidget';
import styles from './LoadingPage.module.css';

function LoadingPage(props) {
    return (
        <div className='column middle-vertical-align-block central-content'>
            <div className={`font--main-for-small-labels ${styles['message']}`}>Loading, please wait...</div>
            <LoadingWidget hasErrorResult={props.hasErrorResult} errorMessage='Loading error. Please return back to the main page and try again.' />
        </div>
    );
}

export default LoadingPage;