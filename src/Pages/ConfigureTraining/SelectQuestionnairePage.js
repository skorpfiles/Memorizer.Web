import RadioButton from '../../RadioButton';
import './SelectQuestionnairePage.css';
import { useState } from 'react';
import QuestionnairesListForSelectPanel from '../../ConfigureTraining/QuestionnairesListForSelectPanel';

function SelectQuestionnairePage(props) {
    const [currentFilter, setCurrentFilter] = useState("ownFilter");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="Column-medium VerticalFullHeightColumn DisplayFlex">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Find and select a questionnaire you like
                </div>
            </div>
            <div className="SelectQuestionnairePage-FiltersContainer GroupInsidePanel">
                <RadioButton containerClassName="SelectQuestionnairePage-LeftFiltersItem" text="My own" id="ownFilter" checked={currentFilter === "ownFilter"} onChange={(event) => setCurrentFilter(event.target.id)} />
                <RadioButton containerClassName="SelectQuestionnairePage-RightFiltersItem" text="From another users" id="foreignFilter" checked={currentFilter === "foreignFilter"} onChange={(event) => setCurrentFilter(event.target.id)} />
            </div>
            <div className="GroupInsidePanel">
                <input className="MainTextBox TextBoxWithoutPanel FullWidth" type="text" placeholder="Search by name" onChange={(event) => setSearchTerm(event.target.value)} value={searchTerm} />
            </div>
            <QuestionnairesListForSelectPanel
                currentOrigin={currentFilter === "foreignFilter" ? "foreign" : "own"}
                currentSearchTerm={searchTerm}
                currentUser={props.currentUser}
            />
        </div>
    );
}

export default SelectQuestionnairePage;