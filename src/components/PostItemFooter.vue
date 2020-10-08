<template>
	<div class="ass1-section__footer">
		<div style="flex: 50">
			<a class="ass1-section__btn-comment ass1-btn-icon" href="#">
				<i class="icon-Comment_Full"></i><span>{{getCommentCount}}</span>
			</a>
		</div>
		
		<div id="post-detail-categories">
			<li :key="item.id" v-for="item in post.categories">
				<router-link :to="getLinkCategory(item)">{{item.name}}</router-link>
			</li>
		</div>
	</div>
</template>

<script>
	import {removeVietnameseFromString} from "../helpers";
	
	export default {
		name: "post-item-footer",
		props: {
			post: {type: Object, default: null}
		},
		computed: {
			getCommentCount() {
				return this.post.count !== null ? this.post.count : 0;
			}
		},
		methods: {
			getLinkCategory(category) {
				return {
					name: 'home',
					query: {
						text: removeVietnameseFromString(category.name),
						tagIndex: category.id
					}
				}
			}
		}
	}
</script>

<style scoped>
	#post-detail-categories {
		flex: 50;
		list-style-type: none;
		display: flex;
		justify-content: flex-end;
	}
	#post-detail-categories > li:not(:last-child) {
		margin-right: 10px;
		background: #e6e9f1;
		border-radius: 20px;
		padding: 4px 8px;
	}
	
	#post-detail-categories > li {
		background: #e6e9f1;
		border-radius: 20px;
		padding: 4px 8px;
	}
</style>
