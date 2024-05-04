import QuickTrainingsListPanelElement from './QuickTrainingsListPanelElement';
import { useEffect, useState } from 'react';
import styles from './QuickTrainingsListPanel.module.css';
import { useSelector } from 'react-redux';
import { callApi } from '../../Utils/GlobalUtils';

function QuickTrainingsListPanel() {

    const [currentTrainingsList, setCurrentTrainingsList] = useState({
        items: null,
        isLoading: true,
        isLoadingSuccessful: false,
        isLoadingError: false,
        loadingErrorMessage: null
    });

    const accessToken = useSelector(state => state.user.accessToken);

    useEffect(() => {
        try {
            const getTrainingListFunc = async () => {
                const response =
                    await callApi('/Repository/Trainings?pageNumber=1&pageSize=4', 'GET', accessToken);
                if (response.ok) {
                    const result = await response.json();
                    setCurrentTrainingsList({
                        items: result.trainings,
                        isLoading: false,
                        isLoadingSuccessful: true,
                        isLoadingError: false,
                        loadingErrorMessage: null
                    });
                }
                else {
                    const result = await response.json();
                    setCurrentTrainingsList({
                        items: null,
                        isLoading: false,
                        isLoadingSuccessful: false,
                        isLoadingError: true,
                        loadingErrorMessage: `${response.status} ${result.errorText}`
                    });
                }
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
                loadingErrorMessage: 'Error: Unable to connect to the API.'
            });
        }
    },[accessToken]);

    var data;
    if (currentTrainingsList.isLoading) {
        data = (<div className='central-text'>Loading...</div>);
    }
    else if (currentTrainingsList.isLoadingSuccessful) {
        if (currentTrainingsList.items !== null && currentTrainingsList.items.length > 0) {
            data = (<ul className='font--main-for-lists tight-list' >
                {currentTrainingsList.items.map(item => <QuickTrainingsListPanelElement key={item.id} training={item} />)}
            </ul>);
        }
        else {
            data = (<div className='central-text'>No items</div>);
        }
    }
    else {
        data = (<div className='central-text'>Error: {currentTrainingsList.loadingErrorMessage}</div>);
    }

    return (
        <div className='column column-small'>
            {data}
            <button className={`central-text font--main-for-controls ${styles['browse-all-button-container']}`}><span className='link-button'>Browse and manage all</span></button>
        </div>
    );
}

export default QuickTrainingsListPanel;