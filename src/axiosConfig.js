import axios from 'axios';

const getCsrfToken = () => {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : null;
};

axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;