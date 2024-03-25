import MainPanel from './ControlPanel/MainPanel';
import ReferencePanel from './ControlPanel/ReferencePanel';
function ControlPanel() {
    return (
        <div style={{ "display": "flex", "flexDirection": "column", "width": "30rem", "margin": "1rem auto" }}>
            <MainPanel />
            <div style={{ "height": "1rem" }}></div>
            <ReferencePanel reference='Test Reference' />
        </div>
    )
}

export default ControlPanel;