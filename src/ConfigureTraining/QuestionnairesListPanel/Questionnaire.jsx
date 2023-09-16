import SectionElement from './SectionElement';
import DeleteIcon from './delete.png';
import { useState } from 'react';
import styles from './Questionnaire.module.css';

function Questionnaire(props) {
    const [mouseOnElement, setMouseOnElement] = useState(false);

    return (
        <SectionElement>
            <div
                onMouseEnter={() => setMouseOnElement(true)}
                onMouseLeave={() => setMouseOnElement(false)}
            >
                {props.name}
                {(mouseOnElement) && (
                    <div className={styles['over-button-background']}>
                    </div>
                )
                }
                {(mouseOnElement) && (
                    <button className={styles['over-button-icon']}
                        onClick={props.deleteQuestionnaire}
                    >
                        <img src={DeleteIcon} alt='Delete' width='12px' />
                    </button>
                )
                }
            </div>
        </SectionElement>
    );
}

export default Questionnaire;