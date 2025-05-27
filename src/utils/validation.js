export const validateBookForm = (formData) => {
    const errors = {};
  
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.author.trim()) errors.author = 'Author is required';
    if (!formData.publisher.trim()) errors.publisher = 'Publisher is required';
    if (!formData.isbn.trim()) errors.isbn = 'ISBN is required';
    if (!formData.genre.trim()) errors.genre = 'Genre is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
  
    if (!formData.publishedDate) {
      errors.publishedDate = 'Published date is required';
    }
  
    if (!formData.pages || isNaN(formData.pages) || parseInt(formData.pages) <= 0) {
      errors.pages = 'Pages must be a positive number';
    }
  
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }
  
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      errors.quantity = 'Quantity must be a non-negative number';
    }
  
    console.log(errors)
    return errors;
  };
  