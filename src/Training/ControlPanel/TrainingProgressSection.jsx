import ProgressSection from "./TrainingProgressSection/ProgressSection";
import OuterSection from "./TrainingProgressSection/OuterSection";
import alarmIcon from './TrainingProgressSection/alarm.png';
import checkIcon from './TrainingProgressSection/check.png';
import styles from './TrainingProgressSection.module.css';

function TrainingProgressSection() {
    return (
        <div className={`font--main-for-controls row ${styles['container']}`}>
            <div className={styles['outer-section-container']}>
                <OuterSection position='left' icon={alarmIcon} iconAlt='QLT' iconTitle='Question Learning Time' text='0:08' />
            </div>
            <div className={styles['progress-section-container']}>
                <ProgressSection />
            </div>
            <div className={styles['outer-section-container']}>
                <OuterSection position='right' icon={checkIcon} iconAlt='Percent' iconTitle='Current Right Answers Percent' text='94%' />
            </div>
        </div>
    )
}

export default TrainingProgressSection;