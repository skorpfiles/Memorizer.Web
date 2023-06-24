import { useEffect } from 'react';

function MainPage() {
    useEffect(() => {
        document.title = "Memorizer";
    });

    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="Column-small">
                <div className="TitleBeforePanel">
                    <div className="Font-MainForLabels">
                        What do you want to do?
                    </div>
                </div>
                <button className="MainButton FullWidth Font-MainForControls IncreaseButtonHeight">Train questions</button>
                <button className="MainButton FullWidth Font-MainForControls">Manage questionnaires</button>
            </div>
        </div>
    );
}

export default MainPage;