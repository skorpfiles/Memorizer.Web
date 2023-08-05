import RadioButton from '../../RadioButton';
import './SelectQuestionnairePage.css';
import { useState } from 'react';

function SelectQuestionnairePage() {
    const [currentFilter, setCurrentFilter] = useState("ownFilter");

    return (
        <div className="Column-medium VerticalCenterColumn">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Find and select a questionnaire you like
                </div>
            </div>
            <div className="SelectQuestionnairePage-FiltersContainer">
                <RadioButton containerClassName="SelectQuestionnairePage-LeftFiltersItem" text="My own" id="ownFilter" checked={currentFilter === "ownFilter"} onChange={(event) => setCurrentFilter(event.target.id)} />
                <RadioButton containerClassName="SelectQuestionnairePage-RightFiltersItem" text="From another users" id="foreignFilter" checked={currentFilter === "foreignFilter"} onChange={(event) => setCurrentFilter(event.target.id)} />
            </div>
        </div>
    );
}

export default SelectQuestionnairePage;