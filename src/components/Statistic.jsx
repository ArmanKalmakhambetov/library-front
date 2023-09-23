import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'https://library-tomiris-60f463aedbca.herokuapp.com/';

export default function Statistic() {
    const [books, setBooks] = useState([]);
    const [genreStats, setGenreStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGenreStats = useCallback(() => {
        fetch(url + "api/books/categories/dto", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setGenreStats(data);
            })
            .catch(error => {
                console.error("Ошибка при загрузке статистики по жанрам:", error);
            });
    }, []);

    const dtoBooks = useCallback(() => {
        fetch( url + "api/books/book_dto", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Ошибка при загрузке данных:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        dtoBooks();
        fetchGenreStats(); // Выполняем запрос для получения статистики по жанрам
    }, [dtoBooks, fetchGenreStats]);

    return (
        <div className="container">
            <h2>Статистика</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <h5>Всего прочитано книг: {books.totalBooks}</h5>
                    <h5>Всего прочитано страниц: {books.totalPageVolume}</h5>
                    <h5>Статистика по жанрам:</h5>
                    <ul>
                        {genreStats.map(genre => (
                            <li key={genre.categoryName}>
                                {genre.categoryName}: {genre.bookCount}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
