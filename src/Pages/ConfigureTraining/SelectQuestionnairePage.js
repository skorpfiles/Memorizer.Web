import RadioButton from '../../RadioButton';
import './SelectQuestionnairePage.css';
import QuestionnairesListForSelectPanel from '../../ConfigureTraining/QuestionnairesListForSelectPanel';

function SelectQuestionnairePage(props) {
    const setCurrentFilter = (id) => props.setStatus(prevState => ({
        ...prevState,
        currentFilter: id
    }));

    const setSearchTerm = (newTerm) => props.setStatus(prevState => ({
        ...prevState,
        searchTerm: newTerm
    }));

    return (
        <div className="Column-medium VerticalFullHeightColumn DisplayFlex">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Find and select a questionnaire you like
                </div>
            </div>
            <div className="SelectQuestionnairePage-FiltersContainer GroupInsidePanel">
                <RadioButton containerClassName="SelectQuestionnairePage-LeftFiltersItem" text="My own" id="ownFilter" checked={props.status.currentFilter === "ownFilter"} onChange={(event) => setCurrentFilter(event.target.id)} />
                <RadioButton containerClassName="SelectQuestionnairePage-RightFiltersItem" text="From another users" id="foreignFilter" checked={props.status.currentFilter === "foreignFilter"} onChange={(event) => setCurrentFilter(event.target.id)} />
            </div>
            <div className="GroupInsidePanel">
                <input className="MainTextBox TextBoxWithoutPanel FullWidth SmallBorderRadius" type="text" placeholder="Search by name" onChange={(event) => setSearchTerm(event.target.value)} value={props.status.searchTerm} />
            </div>
            <QuestionnairesListForSelectPanel
                currentOrigin={props.status.currentFilter === "foreignFilter" ? "foreign" : "own"}
                currentSearchTerm={props.status.searchTerm}
                currentUser={props.currentUser}
                handleConfirmingAddingQuestionnaire={props.handleConfirmingAddingQuestionnaire}
                alreadySelectedQuestionnaires={props.alreadySelectedQuestionnaires}
            />
        </div>
    );
}

export default SelectQuestionnairePage;