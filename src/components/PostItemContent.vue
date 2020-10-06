<template>
	<div class="ass1-section__content">
		<p v-html="formatPostContent"></p>
		<div class="ass1-section__image">
			<router-link :to="getPostLink" href="bai-viet-chi-tiet.html">
				<img :alt="post.content" :src="getPicture()" @click="handlePostDetail(post.id)">
			</router-link>
		</div>
	</div>
</template>

<script>
	import {mapActions} from "vuex";
	import {replaceAll} from "../helpers";
	
	export default {
		name: "post-item-content",
		props: {
			post: {type: Object, default: null}
		},
		data() {
			return {
				querySearch: this.$route.query.query,
			}
		},
		computed: {
			getPostLink() {
				return {name: 'post-detail', params: {id: this.post.id}};
			},
			formatPostContent() {
				if (this.querySearch) {
					// Replace html
					return replaceAll(this.post.content, this.querySearch, `<mark>${this.querySearch}</mark>`)
				} else {
					return this.post.content;
				}
			}
		},
		methods: {
			...mapActions([
				'getPostDetailByPostId'
			]),
			handlePostDetail(id) {
				this.getPostDetailByPostId(id);
			},
			getPicture() {
				if (this.post.urlImage.startsWith("http")) {
					return this.post.urlImage;
				} else {
					return "http://localhost:1102/api/posts/get-image/" + this.post.urlImage;
				}
				
			}
		}
	}
</script>

<style scoped>

</style>
