export default {
	getIsLogin: state => {
		return !!state.ACCESS_TOKEN;
	},
	getCurrentUser: state => {
		return state.currentUser;
	},
	getListPostOfCurrentUser: state => {
		return state.posts[state.currentUser.id];
	}
}
