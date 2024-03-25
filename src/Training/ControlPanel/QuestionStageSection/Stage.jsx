function Stage(props) {
    return props.isActive ? (
        <div class="font--notes font--bold" style={{ "backgroundColor": "white", "padding": "0.2rem 0.5rem" }}>{`► ${props.name}`}</div>
    ) : (
            <div class="font--notes" style={{ "padding": "0.2rem 0.5rem" }} >{props.name}</div>
    );
}

export default Stage;