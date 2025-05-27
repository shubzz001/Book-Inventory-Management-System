
import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import BookForm from './components/BookForm';
// import mockBooks from './data/mockData';
import { validateBookForm } from './utils/validation';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [books, setBooks] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'add', 'edit'
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState(initialFormData());
  const [errors, setErrors] = useState({});



  function initialFormData() {
    return {
      title: '',
      author: '',
      publishedDate: '',
      publisher: '',
      isbn: '',
      genre: '',
      pages: '',
      price: '',
      quantity: '',
      description: ''
    };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = validateBookForm(formData);
    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/bookData`)
      .then(response => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error loading books:', error);
        alert(`Failed to load books. Error: ${error.message}`);
      });
  }, []);


  const handleAddBook = async () => {
    if (validateForm()) {
      const newBook = {
        ...formData,
        pages: parseInt(formData.pages),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookData`, newBook);
        setBooks(prev => [...prev, res.data]);
        resetForm();
        setCurrentView('list');
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book:', error);
        alert(`Failed to add book. Error: ${error.message}`);
      }
    }
  };

  const handleUpdateBook = async () => {
    if (validateForm()) {
      const updatedBook = {
        ...formData,
        pages: parseInt(formData.pages),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/bookData/${selectedBook.id}`, updatedBook);
        setBooks(prev =>
          prev.map(book => book.id === selectedBook.id ? { ...updatedBook, id: selectedBook.id } : book)
        );
        resetForm();
        setCurrentView('list');
        alert('Book updated successfully!');
      } catch (error) {
        console.error('Error updating book:', error);
        alert(`Failed to update book. Error: ${error.message}`);
      }
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/bookData/${bookId}`);
        setBooks(prev => prev.filter(book => book.id !== bookId));
        setSelectedBook(null);
        setCurrentView('list');
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert(`Failed to delete book. Error: ${error.message}`);
      }
    }
  };


  const resetForm = () => {
    setFormData(initialFormData());
    setErrors({});
    setSelectedBook(null);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      publishedDate: book.publishedDate,
      publisher: book.publisher,
      isbn: book.isbn,
      genre: book.genre,
      pages: book.pages.toString(),
      price: book.price.toString(),
      quantity: book.quantity.toString(),
      description: book.description
    });
    setCurrentView('edit');
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setCurrentView('details');
  };

  return (
    <div className="app">
      {currentView === 'list' && (
        <>

          <BookList
            books={books}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteBook}
            setCurrentView={setCurrentView}
          />
        </>
      )}

      {currentView === 'details' && (
        <BookDetails
          book={selectedBook}
          onBack={() => setCurrentView('list')}
          onEdit={handleEdit}
          onDelete={handleDeleteBook}
        />
      )}

      {(currentView === 'add' || currentView === 'edit') && (
        <BookForm
          formData={formData}
          errors={errors}
          onChange={handleInputChange}
          onSubmit={currentView === 'add' ? handleAddBook : handleUpdateBook}
          onCancel={() => {
            resetForm();
            setCurrentView('list');
          }}
          isEditing={currentView === 'edit'}
        />
      )}
    </div>
  );
}

export default App;
