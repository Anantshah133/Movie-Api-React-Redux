import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setMovies, increasePage, setTotalPages } from './actions';
import "./MainMovie.css";

const MainMovie = ({ movieData, currentPage, totalPages, setMovies, increasePage, setTotalPages }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (searchTerm.trim() !== '') {
                    response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=c871de30295795a72989ac274718b1c7&page=${currentPage}&query=${searchTerm}`
                    );
                } else {
                    response = await fetch(
                        `https://api.themoviedb.org/3/movie/top_rated?api_key=c871de30295795a72989ac274718b1c7&page=${currentPage}`
                    );
                }

                const data = await response.json();
                if (currentPage === 1) {
                    setMovies(data.results);
                } else {
                    setMovies([...movieData, ...data.results]);
                }
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [searchTerm, currentPage, setMovies, setTotalPages]);

    const handleShowMore = () => {
        if (currentPage < totalPages) {
            increasePage();
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
    };

    return (
        <div className="main-container">
            <div className="container mt-5">
                <h1 className="text-center text-white mb-5 display-5">Top Rated Movies</h1>
                <div className="mb-5 text-center">
                    <input type="text" placeholder="Search movies..." className="p-2 w-50 glass-input" value={searchTerm} onChange={handleSearchChange} />
                </div>
                <div className="row">
                    {movieData.map((movie) => (
                        <div key={movie.id} className="col-md-3 mb-4">
                            <div className="card glass-morphism h-100 overflow-hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    className="card-img-top h-75"
                                    alt={movie.title}
                                />
                                <div className="card-body">
                                    <h4 className="card-title text-white">{movie.title}</h4>
                                    <p className="card-text text-white">{movie.release_date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {currentPage < totalPages && (
                    <div className="text-center">
                        <button className="glass-button" onClick={handleShowMore}>
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    movieData: state.movieData,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
});

export default connect(mapStateToProps, { setMovies, increasePage, setTotalPages })(MainMovie);