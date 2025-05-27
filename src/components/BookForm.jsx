import React from 'react';

const BookForm = ({
    formData,
    errors,
    onChange,
    onSubmit,
    onCancel,
    isEditing
}) => {
    return (
        <div className="container">
            <div className="back-button">
                <button onClick={onCancel} className="btn btn-secondary">
                    ← Back to List
                </button>
            </div>

            <div className="form-container">
                <h1>{isEditing ? '✏️ Edit Book' : '➕ Add New Book'}</h1>

                <form className="book-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                className={errors.title ? 'error' : ''}
                                placeholder="Enter book title"
                            />
                            {errors.title && <span className="error-message">{errors.title}</span>}
                        </div>

                        <div className="form-group">
                            <label>Author *</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={onChange}
                                className={errors.author ? 'error' : ''}
                                placeholder="Enter author name"
                            />
                            {errors.author && <span className="error-message">{errors.author}</span>}
                        </div>

                        <div className="form-group">
                            <label>Published Date *</label>
                            <input
                                type="date"
                                name="publishedDate"
                                value={formData.publishedDate}
                                onChange={onChange}
                                className={errors.publishedDate ? 'error' : ''}
                            />
                            {errors.publishedDate && <span className="error-message">{errors.publishedDate}</span>}
                        </div>

                        <div className="form-group">
                            <label>Publisher *</label>
                            <input
                                type="text"
                                name="publisher"
                                value={formData.publisher}
                                onChange={onChange}
                                className={errors.publisher ? 'error' : ''}
                                placeholder="Enter publisher name"
                            />
                            {errors.publisher && <span className="error-message">{errors.publisher}</span>}
                        </div>

                        <div className="form-group">
                            <label>ISBN *</label>
                            <input
                                type="text"
                                name="isbn"
                                value={formData.isbn}
                                onChange={onChange}
                                className={errors.isbn ? 'error' : ''}
                                placeholder="Enter ISBN"
                            />
                            {errors.isbn && <span className="error-message">{errors.isbn}</span>}
                        </div>

                        <div className="form-group">
                            <label>Genre *</label>
                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={onChange}
                                className={errors.genre ? 'error' : ''}
                                placeholder="Enter genre"
                            />
                            {errors.genre && <span className="error-message">{errors.genre}</span>}
                        </div>

                        <div className="form-group">
                            <label>Pages *</label>
                            <input
                                type="number"
                                name="pages"
                                value={formData.pages}
                                onChange={onChange}
                                className={errors.pages ? 'error' : ''}
                                placeholder="Number of pages"
                                min="1"
                            />
                            {errors.pages && <span className="error-message">{errors.pages}</span>}
                        </div>

                        <div className="form-group">
                            <label>Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={onChange}
                                className={errors.price ? 'error' : ''}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label>Quantity *</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={onChange}
                                className={errors.quantity ? 'error' : ''}
                                placeholder="Stock quantity"
                                min="0"
                            />
                            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            className={errors.description ? 'error' : ''}
                            placeholder="Enter book description"
                            rows="4"
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="action-buttons pt-2 " style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                        >
                            {isEditing ? '💾 Update Book' : '➕ Add Book'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn btn-secondary"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
