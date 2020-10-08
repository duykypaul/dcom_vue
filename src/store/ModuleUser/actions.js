import axiosInstance from "../../plugins/axios";
import {parseJwt} from "../../helpers";

export default {
	async getUserById({commit}, userId) {
		try {
			let config = {
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
				}
			};
			let result = await axiosInstance.get('users/' + userId, config);
			if (result.data && result.data.status === 200) {
				let userData = result.data.data;
				commit('SET_USER_INFO', userData);
				return {
					ok: true,
					data: userData,
					error: null
				}
			}
		} catch (error) {
			return {
				ok: false,
				error: error.message
			}
		}
	},
	async actionLogin({commit, dispatch}, {username = '', password = ''}) {
		try {
			let data = {
				username,
				password
			};
			
			let result = await axiosInstance.post('auth/sign-in', data);
			if (result.data && result.data.status === 200) {
				let dataUser = {
					user: result.data.userBean,
					token: result.data.token
				};
				commit('SET_USER_INFO', dataUser.user);
				commit('SET_LOGIN_INFO', dataUser);
				dispatch('getListPostByUserId', dataUser.user.id);
				return {
					ok: true,
					data: result.data,
					error: null
				}
			} else {
				return {
					ok: false,
					error: result.data.message
				}
			}
		} catch (error) {
			return {
				ok: false,
				error: error.message
			}
		}
	},
	async checkLogin({commit, dispatch}) {
		try {
			let tokenLocal = localStorage.getItem('ACCESS_TOKEN');
			let userObj = parseJwt(tokenLocal);
			
			if (userObj) {
				let promiseUser = dispatch('getUserById', userObj.id);
				let promisePosts = dispatch('getListPostByUserId', userObj.id);
				let [resultUser, resultPosts] = await Promise.all([promiseUser, promisePosts]);
				if (resultUser.ok && resultPosts.ok) {
					let data = {
						user: resultUser.data,
						token: tokenLocal
					};
					commit('SET_LOGIN_INFO', data);
					return {
						ok: true,
						error: null
					}
				}
			} else {
				return {ok: false}
			}
		} catch (error) {
			return {
				ok: false,
				error: error.message
			}
		}
	},
	actionLogout({commit}) {
		commit('SET_LOG_OUT');
		commit('REMOVE_LIST_POSTS')
	},
	async getListPostByUserId({commit}, id) {
		try {
			let config = {
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
				}
			};
			let resultPosts = await axiosInstance.get("/posts/" + id + "/user", config);
			if (resultPosts.data && resultPosts.data.status === 200) {
				let data = {
					posts: resultPosts.data.data,
					userId: id
				};
				commit('SET_USER_POSTS', data);
				return {
					ok: true,
					data: resultPosts.data.data
				}
			}
		} catch (e) {
			return {
				ok: false,
				error: e.message
			}
		}
	},
	async actionRegister({commit, dispatch}, {username = '', email = '', password = '', repassword = ''}) {
		commit('SET_LOADING', true);
		try {
			let data = {
				username,
				email,
				password,
				repassword
			};
			let resultUser = await axiosInstance.post("/auth/sign-up", data);
			commit('SET_LOADING', false);
			console.log('resultUser: ', resultUser);
			if (resultUser.data.status === 200) {
				/*let data = {
					user: resultUser.data.data
				};
				commit('SET_USER_INFO', data.user);
				commit('SET_LOGIN_INFO', data);*/
				
				return {
					ok: true,
					data: resultUser.data
				}
			} else {
				console.log("resultUser.data.error", resultUser.data.message);
				return {
					ok: false,
					error: resultUser.data.message
				}
			}
		} catch (error) {
			commit('SET_LOADING', false);
			return {
				ok: false,
				error: error.message
			}
		}
	},
	async updateProfile({commit}, {username = '', description = '', gender = '', objFile = null, id = null}) {
		commit('SET_LOADING', true);
		try {
			let bodyFormData = new FormData();
			
			bodyFormData.append('gender', gender);
			bodyFormData.append('username', username);
			bodyFormData.append('description', description);
			
			// For avatar
			if (objFile) {
				bodyFormData.append('fileImage', objFile);
			}
			
			let config = {
				headers: {
					'Content-Type': 'application/json, text/plain, */*, multipart/form-data',
					'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
				}
			};
			
			let result = await axiosInstance.put('/users/' + id, bodyFormData, config);
			commit('SET_LOADING', false);
			if (result.data.status === 200) {
				commit('SET_CURRENT_USER', result.data.data);
				return {
					ok: true,
					user: result.data.data
				}
			} else {
				return {
					ok: false,
					error: result.data.error
				}
			}
		} catch (error) {
			commit('SET_LOADING', false);
			return {
				ok: false,
				error: error.message
			}
		}
	},
	async changePassword({commit}, {oldPassword = '', newPassword = '', reNewPassword = ''}) {
		try {
			let data = {
				oldPassword,
				newPassword,
				reNewPassword
			};
			let config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
				}
			};
			console.log("change_password: ");
			let change_password = await axiosInstance.post("/member/password.php", data, config);
			if (change_password.data && change_password.data.status === 200) {
				return {
					ok: true,
					message: change_password.data.message
				}
			} else {
				return {
					ok: false,
					error: change_password.data.error
				}
			}
		} catch (e) {
			console.log("catch");
			return {
				ok: false,
				error: e.error
			}
		}
	},
	async verifyEmail({commit}, {token = ''}) {
		try {
			let verifyEmail = await axiosInstance.post("/auth/confirm-account?token=" + token);
			return {
				ok: verifyEmail.data && verifyEmail.data.status === 200,
				message: verifyEmail.data.message
			}
		} catch (e) {
			return {
				ok: false,
				error: e.error
			}
		}
	}
}
