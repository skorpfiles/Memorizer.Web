import CorrectPercentSection from "./TrainingProgressSection/CorrectPercentSection";
import ProgressSection from "./TrainingProgressSection/ProgressSection";
import StopwatchSection from "./TrainingProgressSection/StopwatchSection";

function TrainingProgressSection() {
    return (
        <div style={{ "display": "flex", "flexDirection": "row" }}>
            <StopwatchSection />
            <ProgressSection />
            <CorrectPercentSection/>
        </div>
    )
}

export default TrainingProgressSection;