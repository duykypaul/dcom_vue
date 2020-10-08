import axiosInstance from "../../plugins/axios";
import {CURR_PAGE, PAGE_SIZE} from "../../constants";

export default {
	async getListPostHasPaging({commit}, {pageSize = PAGE_SIZE, pageNo = CURR_PAGE, tagIndex = null}) {
		commit('SET_LOADING', true);
		try {
			let config = {
				params: {
					pageNo,
					pageSize
				},
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem("ACCESS_TOKEN")
				}
			};
			let result;
			if (tagIndex) {
				// config.params.tagIndex = tagIndex;
				result = await axiosInstance.get('/posts/pagination/' + tagIndex + "/category", config);
			} else {
				result = await axiosInstance.get('/posts/pagination', config);
			}
			commit('SET_LOADING', false);
			console.log("post: ", result);
			if (result.data && result.data.status === 200) {
				if (pageNo === 0) {
					commit('SET_LIST_POSTS', result.data.data);
				} else {
					commit('PUSH_LIST_POSTS', result.data.data);
				}
			}
		} catch (error) {
			commit('SET_LOADING', false);
			console.log(error);
		}
	},
	async getPostDetailByPostId({commit, dispatch}, postid = null) {
		commit('SET_LOADING', true);
		try {
			let result = await axiosInstance.get('/posts/' + postid);
			commit('SET_LOADING', false);
			if (result.data && result.data.status === 200) {
				console.log("post detail success");
				let resultUser = await dispatch('getUserById', result.data.data.user.id);
				console.log("resultUser: ", resultUser);
				
				commit('SET_USER_INFO', result.data.data.user);
				commit('SET_POST_DETAIL', result.data.data);
				return {
					ok: true,
					data: result.data.data,
					error: null
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
	async getListPostSearch({commit}, searchStr) {
		commit('SET_LOADING', true);
		try {
			const result = await axiosInstance.get('/posts/search/' + searchStr);
			commit('SET_LOADING', false);
			
			if (result.data.status === 200) {
				return {
					ok: true,
					posts: result.data.data
				}
			} else {
				return {
					ok: false
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
	async createNewPost({commit}, {objImage = null, content = '', urlImage = '', categories = []}) {
		commit('SET_LOADING', true);
		try {
			let bodyFormData = new FormData();
			bodyFormData.append('urlImage', urlImage);
			bodyFormData.append('content', content);
			bodyFormData.append('lstCategoryReq', categories);
			
			// For image
			if (objImage) {
				bodyFormData.append('fileImage', objImage);
			}
			let config = {
				headers: {
					accept: 'application/json, text/plain, */*, multipart/form-data',
					Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
				}
			};
			console.log("create post1: ");
			let result = await axiosInstance.post('/posts', bodyFormData, config);
			console.log("create post2: ", result);
			commit('SET_LOADING', false);
			if (result.data.status === 200) {
				return {
					ok: true,
					data: result.data.data
				}
			} else {
				return {
					ok: false,
					error: result.data.error
				}
			}
		} catch (error) {
			console.log("create error: ", error);
			commit('SET_LOADING', false);
			return {
				ok: false,
				error: error.message
			}
		}
	},
	async getListCommentByPostid({commit}, postid) {
		try {
			let result = await axiosInstance.get('/comment/comments.php?postid=' + postid);
			if (result.data.status === 200) {
				return {
					ok: true,
					comments: result.data.comments
				}
			} else {
				return {
					ok: false,
					error: result.data.error
				}
			}
		} catch (error) {
			return {
				ok: false,
				error: error.message
			}
		}
	},
}
