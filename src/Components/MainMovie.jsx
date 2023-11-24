import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setMovies, increasePage } from './actions';
import "./MainMovie.css";

const MainMovie = ({ movieData, currentPage, totalPages, setMovies, increasePage, setTotalPages }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=c871de30295795a72989ac274718b1c7&page=${currentPage}`
                );
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
    }, [currentPage]);

    const handleShowMore = () => {
        if (currentPage < totalPages) {
            increasePage();
        }
    };

    return (
        <div className="main-container">
            <div className="container mt-5">
                <h1 className="text-center mb-5">Top Rated Movies</h1>
                <div className="row">
                    {movieData.map((movie) => (
                        <div key={movie.id} className="col-md-3 mb-4">
                            <div className="glass-morphism h-100 overflow-hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    className="img-fluid"
                                    alt={movie.title}
                                />
                                <div className="">
                                    <h5 className="text-white">{movie.title}</h5>
                                    <p className="text-white-50">{movie.release_date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {currentPage < totalPages && (
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={handleShowMore}>
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

export default connect(mapStateToProps, { setMovies, increasePage })(MainMovie);