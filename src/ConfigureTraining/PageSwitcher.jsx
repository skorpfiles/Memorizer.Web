import PointerButton from '../Controls/PointerButton';
import styles from './PageSwitcher.module.css';

function PageSwitcher(props) {
    return (
        <div className={styles['container']}>
            <PointerButton id="PreviousPage" value="<" disabled={!props.currentPage || props.currentPage===1} />
            <label className="font--main-for-controls font--bold">Page {props.currentPage ?? 0} / {props.totalPages ?? 0}</label>
            <PointerButton id="NextPage" value=">" disabled={!props.currentPage || !props.totalPages || props.currentPage===props.totalPages } />
        </div>
    );
}

export default PageSwitcher;