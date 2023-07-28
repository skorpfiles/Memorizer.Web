import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    useEffect(() => {
        document.title = "Memorizer";
    });

    const navigate = useNavigate();

    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="MiddleVerticalAlignBlock Column-small">
                <div className="TitleBeforePanel">
                    <div className="Font-MainForLabels">
                        What do you want to do?
                    </div>
                </div>
                <div className="MainControlContainer DisplayFlex">
                    <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls IncreaseButtonHeight" onClick={() => navigate("/train/select") }>Train questions</button>
                </div>
                <div className="MainControlContainer DisplayFlex">
                    <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls">Manage questionnaires</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;