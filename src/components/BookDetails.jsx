import React from 'react';

const BookDetails = ({ book, onBack, onEdit, onDelete }) => {
    if (!book) return null;

    return (
        <div className="container">
            <div className="back-button">
                <button onClick={onBack} className="btn btn-secondary">
                    ← Back to List
                </button>
            </div>

            <div className="book-details">
                <div className="book-header">
                    <h1>{book.title}</h1>
                    <div className="book-meta">
                        <span>👤 {book.author}</span>
                        <span>📅 {new Date(book.publishedDate).toLocaleDateString()}</span>
                        <span>🏢 {book.publisher}</span>
                    </div>
                </div>

                <div className="book-content">
                    <div className="book-info-grid">
                        <div className="info-item">
                            <strong>ISBN:</strong> {book.isbn}
                        </div>
                        <div className="info-item">
                            <strong>Genre:</strong> <span className="genre-badge">{book.genre}</span>
                        </div>
                        <div className="info-item">
                            <strong>Pages:</strong> {book.pages}
                        </div>
                        <div className="info-item">
                            <strong>Price:</strong> ₹{book.price}
                        </div>
                        <div className="info-item">
                            <strong>Quantity:</strong>
                            <span className={`quantity-badge ${book.quantity < 10 ? 'low-stock' : ''}`}>
                                {book.quantity}
                            </span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h3>📖 Description</h3>
                        <div className="description-content">
                            <p>{book.description}</p>
                        </div>
                    </div>

                    <div className="action-buttons pt-2 " style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => onEdit(book)} className="btn btn-edit">✏️ Edit Book</button>
                        <button onClick={() => onDelete(book.id)} className="btn btn-delete">🗑️ Delete Book</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
