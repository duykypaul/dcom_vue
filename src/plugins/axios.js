import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:1102/api/',
	// timeout: 1000,
	headers: {
		'accept': 'application/json',
		'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
	}
});
export default axiosInstance;
