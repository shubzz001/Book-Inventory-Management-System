// import axios from 'axios';

// export default axios.create({
//     baseURL: 'https://book-json-server-backend.onrender.com/'
//   });
  
import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
