export default {
	getListPosts: state => {
		return state.listPosts;
	},
	getPostDetail: state => {
		if (state.postDetail) {
			return {
				post: {
					...state.postDetail,
				}
			};
		}
	}
}
