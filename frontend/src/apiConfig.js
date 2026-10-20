const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocal 
    ? "http://localhost:8080" 
    : "https://knowledge-zone-an-e-learning-plateform.onrender.com"; 

// export const API_BASE_URL = "https://knowledge-zone-an-e-learning-plateform.onrender.com"; 