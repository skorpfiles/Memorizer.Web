import LoadingAnimation from '../LoadingAnimation';
import styles from './LoaderSection.module.css';
function LoaderSection(props) {
    let content;

    if (props.isLoading) {
        content = (
            <div>
                <LoadingAnimation />
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