<template>
	<div class="ass1-section__list">
		<post-item
			:key="item.id"
			:post="item"
			v-for="item in getListPosts"
		/>
		<button
			@click="handleLoadMore"
			class="load-more ass1-btn"
			v-if="getListPosts && getListPosts.length"
		>
			<span>Xem thêm</span>
		</button>
		<h3 v-else>Danh sách rỗng</h3>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	import PostItem from "./PostItem";
	import {CURR_PAGE, PAGE_SIZE} from "../constants";
	
	export default {
		name: "post-list",
		components: {PostItem},
		data() {
			return {
				pageSize: PAGE_SIZE,
				pageNo: CURR_PAGE,
				tagIndex: parseInt(this.$route.query.tagIndex)
			}
		},
		watch: {
			$route(to, from) {
				this.tagIndex = to.query.tagIndex;
				this.pageNo = CURR_PAGE;
			}
		},
		computed: {
			...mapGetters([
				'getListPosts'
			])
		},
		methods: {
			...mapActions([
				'getListPostHasPaging'
			]),
			handleLoadMore() {
				this.pageNo++;
				let obj = {
					pageSize: this.pageSize,
					pageNo: this.pageNo,
					tagIndex: this.tagIndex
				};
				this.getListPostHasPaging(obj);
			}
		}
	}
</script>

<style scoped>

</style>
