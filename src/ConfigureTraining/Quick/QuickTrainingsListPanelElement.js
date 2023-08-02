function QuickTrainingsListPanelElement(props) {
    return (<li key={props.training.id}><a href="#">{props.training.name}</a></li>);
}

export default QuickTrainingsListPanelElement;