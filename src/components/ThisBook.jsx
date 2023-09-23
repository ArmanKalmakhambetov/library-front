import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

const url = 'https://library-tomiris-60f463aedbca.herokuapp.com/';

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [modal, setModal] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookYear, setBookYear] = useState('');
    const [bookPages, setBookPages] = useState('');
    const [bookReview, setBookReview] = useState('');
    const [bookRating, setBookRating] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookImage, setBookImage] = useState('');
    const [bookCategories, setBookCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);

    const fetchCategories = useCallback(() => {
        fetch(url + 'api/books/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAvailableCategories(data);
            })
            .catch((error) => {
                console.error('There was a problem fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const toggle = () => setModal(!modal);

    const fetchBook = useCallback(() => {
        fetch(url + `api/books/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                console.error('There was a problem fetching book data:', error);
            });
    }, [id]);

    useEffect(() => {
        fetchBook();
    }, [fetchBook]);

    const deleteBook = useCallback(() => {
        fetch( url + `api/books/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                navigate('/allBooks');
            })
            .catch((error) => {
                console.error('There was a problem deleting the book:', error);
            });
    }, [id, navigate]);

    useEffect(() => {
        if (book) {
            setBookTitle(book.title);
            setBookAuthor(book.author);
            setBookYear(book.year);
            setBookPages(book.pageVolume);
            setBookReview(book.review);
            setBookRating(book.rating);
            setBookDescription(book.description);
            setBookImage(book.image);
            setBookCategories(book.categories.map(category => category.name).join(', '));  // Если categories является массивом
            // Initialize other fields here that you want to edit
        }
    }, [book]);

    const editBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch( url + `api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: bookTitle,
                    author: bookAuthor,
                    year: bookYear,
                    pageVolume: bookPages,
                    review: bookReview,
                    rating: bookRating,
                    description: bookDescription,
                    image: bookImage,
                    categories: bookCategories.split(', ').map(name => ({ name }))
                }),
            });

            const updatedBook = await response.json();
            setBook(updatedBook);
            toggle();  // закрыть модальное окно
        } catch (error) {
            console.error('There was a problem updating the book:', error);
        }
    };

    return (
        <div className="container-fluid m-5">
            {book ? (
                <>
                    <div className="row">
                        <div className="col-sm-4">
                            <img
                                src={book.image}
                                alt={`Cover of ${book.title}`}
                                style={{ height: '672px', width: '417px' }}
                            />
                            <div className="my-3">
                                <button className="btn btn-danger me-3" onClick={deleteBook}>Удалить</button>
                                <Button color="primary" onClick={toggle}>Изменить</Button>
                                <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle}>Изменить книгу</ModalHeader>
                                    <ModalBody>
                                        <div className="form-group">
                                            <label className="my-3" htmlFor="title">Название книги</label>
                                            <input value={bookTitle} type="text" className="input form-control"
                                                   onChange={(e) => setBookTitle(e.target.value)} />
                                            <label className="my-3" htmlFor="author">Автор</label>
                                            <input value={bookAuthor} type="text" className="input form-control"
                                                   onChange={(e) => setBookAuthor(e.target.value)} />
                                            <label className="my-3" htmlFor="category">Жанр</label>
                                            <select value={bookCategories} onChange={(e) => setBookCategories(e.target.value)} className="form-control">
                                                {availableCategories.map((category, index) => (
                                                    <option key={index} value={category.name}>{category.name}</option>
                                                ))}
                                            </select>
                                            <label className="my-3" htmlFor="year">Год</label>
                                            <input value={bookYear} type="number" className="input form-control"
                                                   onChange={(e) => setBookYear(e.target.value)} />
                                            <label className="my-3" htmlFor="pageVolume">Количество страниц</label>
                                            <input value={bookPages} type="number" className="input form-control"
                                                   onChange={(e) => setBookPages(e.target.value)} />
                                            <label className="my-3" htmlFor="description">Описание</label>
                                            <input value={bookDescription} type="text" className="input form-control"
                                                   onChange={(e) => setBookDescription(e.target.value)} />
                                            <label className="my-3" htmlFor="review">Обзор</label>
                                            <input id="review" value={bookReview} type="text" className="input form-control"
                                                   onChange={(e) => setBookReview(e.target.value)} />
                                            <label className="my-3" htmlFor="rating">Оценка</label>
                                            <input pattern="[1-10]" value={bookRating} type="number" className="input form-control"
                                                   onChange={(e) => setBookRating(e.target.value)} />
                                            <label className="my-3" htmlFor="image">Ссылка на изображение</label>
                                            <input value={bookImage} type="text" className="input form-control"
                                                   onChange={(e) => setBookImage(e.target.value)} />
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={editBook}>Изменить</Button>
                                        <Button color="secondary" onClick={toggle}>Отмена</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <h3>{book.title}</h3>
                            <h5>Автор: {book.author}</h5>
                            <h5>Жанр: {book.categories.map((category, index) => (
                                <span key={index}>{category.name}</span>
                            ))}
                            </h5>

                            <h5>Год: <span>{book.year}</span></h5>
                            <h5>Количество страниц: <span>{book.pageVolume}</span></h5>
                            <h5 className="mt-5">Описание</h5>
                            <p style={{height: "500", width: "300"}}>{book.description}</p>
                            <h5>Обзор</h5>
                            <p style={{height: "500", width: "300"}}>{book.review}</p>
                            <h5>Оценка</h5>
                            <p style={{height: "500", width: "300"}}>{book.rating}/10</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

