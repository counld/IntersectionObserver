import axios from "axios";

export default function login(params={}) {
	return axios.get('/api/login',params)
}