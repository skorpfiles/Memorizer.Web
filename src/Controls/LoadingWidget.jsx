import loadingIcon from './LoadingWidget/loader.gif';
import warningIcon from './LoadingWidget/warning.png';
import styles from './LoadingWidget.module.css';
function LoadingWidget(props) {
    let content;

    if (!props.hasErrorResult) {
        content = (<img src={loadingIcon} width='150rem' alt='Loading...' />);
    }
    else {
        content = (
            <div className='row'>
                <img src={warningIcon} width='24rem' alt='Error' />
                <div className={`font--default ${styles['errorText']}`}>{ props.errorMessage }</div>
            </div>
        );
    }

    return content;
}

export default LoadingWidget;