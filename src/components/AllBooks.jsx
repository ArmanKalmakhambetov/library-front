import React, {useCallback, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';

// const url = 'https://library-tomiris-60f463aedbca.herokuapp.com/';
const url = 'https://localhost:5050/';
export default function AllBooks() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchBooks = useCallback(() => {
        fetch(url + 'api/books', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }, []);


    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);



    const goToBookDetails = (id) => {
        navigate(`/thisBook/${id}`);
    };

    return (
        <div className="container">
            <h2 className="mx-4">Все книги</h2>
            <ul>
                {books.map((book) => (
                    <div className="card mb-3" key={book.id} onClick={() => goToBookDetails(book.id)}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-1 d-flex justify-content-center">
                                    <img src={book.image} className="card-img-top"
                                         style={{ height: '113px', width: '76px' }} alt="Обложка книги" />
                                </div>
                                <div className="col-sm-8">
                                    <h5 className="card-title">{book.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                    <p className="card-text">{book.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

