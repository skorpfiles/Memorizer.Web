import TextBasedRadioButton from '../../Controls/TextBasedRadioButton';
import styles from './SelectQuestionnairePage.module.css';
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
        <section className='column-medium vertical-full-height-column display-flex'>
            <header className='title-before-panel font--main-for-labels'>
                Find and select a questionnaire you like
            </header>
            <div className={`group-inside-panel ${styles['filters-container']}`}>
                <TextBasedRadioButton containerClassName={styles['left-filters-item']} text='My own' id='ownFilter' checked={props.status.currentFilter === 'ownFilter'} onChange={(event) => setCurrentFilter(event.target.id)} />
                <TextBasedRadioButton containerClassName={styles['right-filters-item']} text='From other users' id='foreignFilter' checked={props.status.currentFilter === 'foreignFilter'} onChange={(event) => setCurrentFilter(event.target.id)} />
            </div>
            <div className='group-inside-panel'>
                <input className='main-text-box text-box-without-panel full-width border-radius-small font--main-for-controls' type='text' placeholder='Search by name' onChange={(event) => setSearchTerm(event.target.value)} value={props.status.searchTerm} />
            </div>
            <QuestionnairesListForSelectPanel
                currentOrigin={props.status.currentFilter === 'foreignFilter' ? 'foreign' : 'own'}
                currentSearchTerm={props.status.searchTerm}
                handleConfirmingAddingQuestionnaire={props.handleConfirmingAddingQuestionnaire}
                alreadySelectedQuestionnaires={props.alreadySelectedQuestionnaires}
            />
        </section>
    );
}

export default SelectQuestionnairePage;