import CorrectPercentSection from "./TrainingProgressSection/CorrectPercentSection";
import ProgressSection from "./TrainingProgressSection/ProgressSection";
import StopwatchSection from "./TrainingProgressSection/StopwatchSection";

function TrainingProgressSection() {
    return (
        <div className='font--main-for-controls' style={{ "display": "flex", "flexDirection": "row", "borderTop": "0.1rem solid black" }}>
            <div style={{"flex":"1 0 0"}}>
                <StopwatchSection />
            </div>
            <div style={{ "flex": "4 0 0" }}>
                <ProgressSection />
            </div>
            <div style={{ "flex": "1 0 0" }}>
                <CorrectPercentSection />
            </div>
        </div>
    )
}

export default TrainingProgressSection;