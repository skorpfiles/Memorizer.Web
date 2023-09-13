import QuickTrainingsListPanelElement from "./QuickTrainingsListPanelElement";
import { useEffect, useState } from 'react';

function QuickTrainingsListPanel() {

    const [currentTrainingsList, setCurrentTrainingsList] = useState({
        items: null,
        isLoading: true,
        isLoadingSuccessful: false,
        isLoadingError: false,
        loadingErrorMessage: null
    });

    useEffect(() => {
        try {
            const getTrainingListFunc = async () => {
                //const response =
                //    await callApi("/Repository/Trainings?pageNumber=1&pageSize=4", "GET", props.currentUser.accessToken);
                //if (response.ok) {
                //    const result = await response.json();
                //    setCurrentTrainingsList({
                //        items: result.trainings,
                //        isLoading: false,
                //        isLoadingSuccessful: true,
                //        isLoadingError: false,
                //        loadingErrorMessage: null
                //    });
                //}
                //else {
                //    const result = await response.json();
                //    setCurrentTrainingsList({
                //        items: null,
                //        isLoading: false,
                //        isLoadingSuccessful: false,
                //        isLoadingError: true,
                //        loadingErrorMessage: `${response.status} ${result.errorText}`
                //    });
                //}
                setCurrentTrainingsList({
                    items: [
                        {
                            id: "1",
                            name: "Training 1"
                        },
                        {
                            id: "2",
                            name: "Training 2"
                        },
                        {
                            id: "3",
                            name: "Very Very Very Very Very Very Very Very Very Long Training Name"
                        }
                    ],
                    isLoading: false,
                    isLoadingSuccessful: true,
                    isLoadingError: false,
                    loadingErrorMessage: null
                });
            }
            getTrainingListFunc().catch(console.error);
        }
        catch(error) {
            console.log(error);
            setCurrentTrainingsList({
                items: null,
                isLoading: false,
                isLoadingSuccessful: false,
                isLoadingError: true,
                loadingErrorMessage: "Error: Unable to connect to the API."
            });
        }
    },[]);

    var data;
    if (currentTrainingsList.isLoading) {
        data = (<div className="central-text">Loading...</div>);
    }
    else if (currentTrainingsList.isLoadingSuccessful) {
        if (currentTrainingsList.items !== null && currentTrainingsList.items.length > 0) {
            data = (<ul className="font--main-for-lists tight-list" >
                {currentTrainingsList.items.map(item => <QuickTrainingsListPanelElement key={item.id} training={item} />)}
            </ul>);
        }
        else {
            data = (<div className="central-text">No items</div>);
        }
    }
    else {
        data = (<div className="central-text">Error: {currentTrainingsList.loadingErrorMessage}</div>);
    }

    return (
        <div className="column-small display-flex panel border-radius-big">
            {data}
            <div className="central-text font--default" style={{marginTop:"0.7rem"}}>Browse and manage all</div>
        </div>
    );
}

export default QuickTrainingsListPanel;