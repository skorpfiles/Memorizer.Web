import chartIcon from './chart.png';
function Rating(props) {
    return (
        <div style={{ "display": "flex", "flexDirection": "row", "flexGrow": "1" }}>
            <img src={chartIcon} width='16rem' alt='Rating' title='Rating' />
            <div style={{ "flexGrow": "1", "marginLeft": "0.15rem" }}>{props.isNew ? 'N' : props.value}</div>
        </div>
    )
}

export default Rating;