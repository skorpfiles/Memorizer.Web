import QuickTrainingsListPanelElement from "./QuickTrainingsListPanelElement";
import { useEffect, useState } from 'react';
import { CallApi } from '../../Utils/GlobalUtils';

function QuickTrainingsListPanel(props) {

    let [currentTrainingsList, setCurrentTrainingsList] = useState({
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
                //    await CallApi("/Repository/Trainings?pageNumber=1&pageSize=4", "GET", props.currentUser.accessToken);
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
    });

    var data;
    if (currentTrainingsList.isLoading) {
        data = (<div className="CenterText">Loading...</div>);
    }
    else if (currentTrainingsList.isLoadingSuccessful) {
        if (currentTrainingsList.items !== null && currentTrainingsList.items.length > 0) {
            data = (<ul className="Font-MainForLists TightList">
                {currentTrainingsList.items.map(item => <QuickTrainingsListPanelElement training={item} />)}
            </ul>);
        }
        else {
            data = (<div className="CenterText">No items</div>);
        }
    }
    else {
        data = (<div className="CenterText">Error: {currentTrainingsList.loadingErrorMessage}</div>);
    }

    return (
        <div className="Column-small Panel">
            {data}
            <div className="CenterText Font-Default"><a href="#">Browse and manage all</a></div>
        </div>
    );
}

export default QuickTrainingsListPanel;