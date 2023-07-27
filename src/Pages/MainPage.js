import { useEffect } from 'react';

function MainPage() {
    useEffect(() => {
        document.title = "Memorizer";
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
                    <a className="CentralButton-SmallWidth" href="/train/select"><button className="MainButton IncreaseButtonHeight FullWidth Font-MainForControls">Train questions</button></a>
                </div>
                <div className="MainControlContainer DisplayFlex">
                    <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls">Manage questionnaires</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;