function Stage(state) {
    return state.isActive ? (
        <div class="font--notes font--bold" style={{ "backgroundColor": "white", "padding": "0.2rem 0.5rem" }}>{`► ${state.name}`}</div>
    ) : (
            <div class="font--notes" style={{ "padding": "0.2rem 0.5rem" }} >{state.name}</div>
    );
}

export default Stage;