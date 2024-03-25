import bookIcon from './book.png';
function Questionnaire(props) {
    return (
        <div style={{ "display": "flex", "flexDirection": "row", "flexGrow":"1" }}>
            <img src={bookIcon} width='16rem' alt='Questionnaire' title='Questionnaire' />
            <div style={{"flexGrow":"1","marginLeft":"0.15rem"}}>{props.name}</div>
        </div>
    )
}

export default Questionnaire;