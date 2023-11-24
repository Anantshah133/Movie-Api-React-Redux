export const setMovies = (movies) => ({
    type: 'SET_MOVIES',
    payload: movies,
});

export const increasePage = () => ({
    type: 'INCREASE_PAGE',
});

export const setTotalPages = (totalPages) => ({
    type: 'SET_TOTAL_PAGES',
    payload: totalPages,
});