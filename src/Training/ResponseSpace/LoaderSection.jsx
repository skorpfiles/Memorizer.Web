import LoadingWidget from '../LoadingWidget';
import styles from './LoaderSection.module.css';
function LoaderSection(props) {
    let content;

    if (props.isLoading) {
        content = (
            <div>
                <LoadingWidget hasErrorResult={props.hasErrorResult} errorMessage='Loading error. Please try again.' />
            </div>
        );
    }
    else {
        content = (
            <div className={styles['content']} />
        );
    }

    return content;
}

export default LoaderSection;