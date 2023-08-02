import { useEffect } from 'react';

function MainPage() {
    useEffect(() => {
        document.title = "Memorizer";
        console.log(process.env.REACT_APP_MANAGEMENT_URL);
    });

    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="MiddleVerticalAlignBlock Column-small">
                <div className="TitleBeforePanel">
                    <div className="Font-MainForLabels">
                        What do you want to do?
                    </div>
                </div>
                <div className="MainControlContainer DisplayFlex">
                    <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls IncreaseButtonHeight">Train questions</button>
                </div>
                <div className="MainControlContainer DisplayFlex">
                    <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls" onClick={() => window.open(process.env.REACT_APP_MANAGEMENT_URL, "_blank") }>Manage questionnaires</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;