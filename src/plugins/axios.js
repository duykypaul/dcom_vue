import axios from 'axios';
import {VUE_APP_API_URL} from "../constants";

const axiosInstance = axios.create({
	baseURL: VUE_APP_API_URL,
	// timeout: 1000,
	headers: {
		'accept': 'application/json',
		'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
	}
});
export default axiosInstance;
