<template>
	<div class="container">
		<!--sections-->
		<div class="row">
			<div class="col-lg-8">
				<!--section-->
				<div class="ass1-section__list">
					<div class="ass1-section" v-if="getPostDetail && getPostDetail.post">
						<post-item :post="getPostDetail.post">
							<template id="post-detail-categories">
								<li :key="item.id" v-for="item in getPostDetail.post.categories">
									<router-link :to="getLinkCategory(item)">{{item.id}}</router-link>
								</li>
							</template>
						</post-item>
						<!--<post-feeling/>-->
					</div>
					<post-comment-add/>
					<post-comment-list/>
				</div>
			</div>
			<div class="col-lg-4">
				<side-bar/>
			</div>
		</div>
	</div>
</template>

<script>
	import PostItem from "../components/PostItem";
	import PostFeeling from "../components/PostFeeling";
	import PostCommentAdd from "../components/PostCommentAdd";
	import PostCommentList from "../components/PostCommentList";
	import SideBar from "../components/SideBar";
	import {mapActions, mapGetters} from "vuex";
	import {removeVietnameseFromString} from "../helpers";
	
	export default {
		name: "post-detail",
		components: {SideBar, PostCommentList, PostCommentAdd, PostFeeling, PostItem},
		data() {
			return {
				postId: this.$route.params.id
			}
		},
		watch: {
			$route(to, from) {
				this.postId = to.params.id;
				this.fetchPostById();
			}
		},
		created() {
			this.fetchPostById();
		},
		computed: {
			...mapGetters([
				'getPostDetail'
			])
		},
		methods: {
			...mapActions([
				'getPostDetailByPostId'
			]),
			getLinkCategory(category) {
				return {
					name: 'home',
					query: {
						text: removeVietnameseFromString(category.name),
						tagIndex: category.id
					}
				}
			},
			fetchPostById() {
				this.getPostDetailByPostId(this.postId).then(res => {
					if (!res.ok) {
						this.$router.push('/');
					}
				});
			}
		}
	}
</script>

<style scoped>
	.row {
		margin: 68px auto;
	}
	#post-detail-categories {
		list-style-type: none;
	}
</style>
