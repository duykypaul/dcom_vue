export default {
	getListPosts: state => {
		return state.listPosts;
	},
	getPostDetail: state => {
		if (state.postDetail) {
			console.log(state.postDetail);
			return state.postDetail;
		}
	}
}
