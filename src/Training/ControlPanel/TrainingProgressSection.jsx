import CorrectPercentSection from "./TrainingProgressSection/CorrectPercentSection";
import ProgressSection from "./TrainingProgressSection/ProgressSection";
import StopwatchSection from "./TrainingProgressSection/StopwatchSection";

function TrainingProgressSection() {
    return (
        <div style={{ "display": "flex", "flexDirection": "row", "borderTop":"0.1rem solid black" }}>
            <StopwatchSection />
            <ProgressSection />
            <CorrectPercentSection/>
        </div>
    )
}

export default TrainingProgressSection;