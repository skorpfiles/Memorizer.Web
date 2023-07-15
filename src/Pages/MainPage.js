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
                    <button className="MainButton FullWidth ButtonMarginForColumnWithoutBorders Font-MainForControls IncreaseButtonHeight">Train questions</button>
                </div>
                <div className="MainControlContainer DisplayFlex">
                    <button className="MainButton FullWidth ButtonMarginForColumnWithoutBorders Font-MainForControls">Manage questionnaires</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;