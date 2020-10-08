<template>
	<div class="container">
		<!--sections-->
		<div class="row">
			<div class="col-lg-8">
				<!--section-->
				<div class="ass1-section__list">
					<div class="ass1-section" v-if="getPostDetail">
						<post-item :post="getPostDetail" />
						<post-feeling/>
					</div>
					<post-comment-add/>
					<post-comment-list :post="getPostDetail"/>
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
</style>
