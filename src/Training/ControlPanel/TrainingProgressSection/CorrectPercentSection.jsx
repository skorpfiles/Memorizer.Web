import checkIcon from './check.png';

function CorrectPercentSection() {
    return (
        <div className='font--bold' style={{ "display": "flex", "borderLeft": "0.1rem solid black", "minHeight": "100%" }}>
            <div style={{ "display": "flex", "flexDirection": "row", "margin": "0.2rem", "minHeight": "100%" }}>
                <img src={checkIcon} width='20rem' alt='Percent' title='Current Right Answers Percent' />
                <div style={{ "flexGrow": "1", "marginLeft": "0.15rem", "minHeight": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" }}>94%</div>
            </div>
        </div>
    )
}

export default CorrectPercentSection;