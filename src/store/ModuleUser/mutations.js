import Vue from "vue";

export default {
	SET_USER_INFO(state, user) {
		Vue.set(state.users, user.id, user);
	},
	SET_LOGIN_INFO(state, {user, token}) {
		state.currentUser = user;
		state.ACCESS_TOKEN = token;
		localStorage.setItem('ACCESS_TOKEN', token);
	},
	SET_LOG_OUT(state) {
		state.currentUser = null;
		state.ACCESS_TOKEN = null;
		localStorage.removeItem('ACCESS_TOKEN');
	},
	SET_USER_POSTS(state, {posts, userId}) {
		Vue.set(state.posts, userId, posts);
	},
	SET_CURRENT_USER(state, user) {
		state.currentUser = user;
	}
}
