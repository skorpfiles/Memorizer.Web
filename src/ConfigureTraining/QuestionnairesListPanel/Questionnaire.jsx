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
                    <div className={styles['over-button-icon']}
                        onClick={props.deleteQuestionnaire}
                    >
                        <a href="#">
                            <img src={DeleteIcon} alt="Delete" width="12px" />
                        </a>
                    </div>
                )
                }
            </div>
        </SectionElement>
    );
}

export default Questionnaire;