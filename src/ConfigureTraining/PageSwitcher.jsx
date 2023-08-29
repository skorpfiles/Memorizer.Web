import PointerButton from '../PointerButton';
import './PageSwitcher.css';

function PageSwitcher(props) {
    return (
        <div className="PageSwitcher-Container">
            <PointerButton id="PreviousPage" value="<" disabled={!props.currentPage || props.currentPage==1} />
            <div className="Font-MainForControls Font-Bold PageSwitcher-Label">Page {props.currentPage ?? 0} / {props.totalPages ?? 0}</div>
            <PointerButton id="NextPage" value=">" disabled={!props.currentPage || !props.totalPages || props.currentPage==props.totalPages } />
        </div>
    );
}

export default PageSwitcher;