import React from 'react';
import SearchBar from './SearchBar';

const BookList = ({ books, onView, onEdit, onDelete, searchTerm, setSearchTerm, setCurrentView }) => {
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="header">
                <div className="header-left">
                    <h1>📚 Book Inventory Management System</h1>
                    <p>Manage your book collection with ease</p>
                </div>
                <div className="header-right">
                    <div className="add-button-container">
                        <button className="btn  btn-primary" onClick={() => setCurrentView('add')}>
                            <i className="fas fa-plus"></i> Add New Book
                        </button>
                    </div>
                </div>
            </div>

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="stats">
                <div className="stat-card">
                    <h3>{books.length}</h3>
                    <p>Total Books</p>
                </div>
                <div className="stat-card">
                    <h3>{books.reduce((sum, book) => sum + book.quantity, 0)}</h3>
                    <p>Total Quantity</p>
                </div>
                <div className="stat-card">
                    <h3>₹{books.reduce((sum, book) => sum + (book.price * book.quantity), 0).toFixed(2)}</h3>
                    <p>Total Value</p>
                </div>
            </div>

            <div className="table-container">
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Book Info</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* <tbody > */}
                    <tbody className="scrollable-tbody">
                        {filteredBooks.map((book) => (
                            <tr key={book.id}>
                                <td className="clickable-book-info" onClick={() => onView(book)}>
                                    <div className="book-info">
                                        <strong>{book.title}</strong>
                                        <small>{book.pages} pages</small>
                                    </div>
                                </td>
                                <td>{book.author}</td>
                                <td>
                                    <span className="genre-badge">{book.genre}</span>
                                </td>
                                <td>₹{book.price}</td>
                                <td>
                                    <span className={`quantity-badge ${book.quantity < 10 ? 'low-stock' : ''}`}>
                                        {book.quantity}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn btn-view" title="View" onClick={() => onView(book)}>👁️</button>
                                        <button className="btn btn-edit" title="Edit" onClick={() => onEdit(book)}>✏️</button>
                                        <button className="btn btn-delete" title="Delete" onClick={() => onDelete(book.id)}>🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredBooks.length === 0 && (
                    <div className="no-results">
                        {books.length === 0
                            ? '📚 No books in inventory. Add some books to get started!'
                            : '🔍 No books match your search criteria.'
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;