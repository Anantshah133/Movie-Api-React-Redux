const initialState = {
    movieData: [],
    currentPage: 1,
    totalPages: 0,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movieData: action.payload,
            };
        case 'INCREASE_PAGE':
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;