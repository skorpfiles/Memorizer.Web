function QuickTrainingConfigurationPage() {
    return (
        <div className="MiddleVerticalAlignContainer VerticalCenterColumn">
            <div className="MainControlContainer MiddleVerticalAlignBlock">
                <div className="Font-MainForLabels CenterText">Select a training you've trained recently</div>
            </div>
            <div className="Column-small">
                <MemorizerLogoWithSubtitle />
                <AuthenticationPanel
                    handleLogIn={props.handleLogIn}
                    currentUser={props.currentUser}
                />
            </div>
        </div>
    )
}