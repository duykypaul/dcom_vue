<template>
	<div class="container search-page" v-if="this.listPostSearch">
		<div class="search-info">
			<h3>Từ khóa tìm kiểm: <strong>{{ query }}</strong></h3>
			<p>Tìm kiếm được ({{ this.listPostSearch.length }}) kết quả</p>
			<!-- <p>Nội dung b<mark>ài</mark>  viết nè</p> -->
		</div>
		<div
			class="ass1-section__wrap row ass1-section__isotope-init"
			column-width='.grid-sizer'
			item-selector=".ass1-section__item"
			transition-duration="0.3s"
			v-if="listPostSearch && listPostSearch.length"
			v-masonry>
			
			<div class="grid-sizer"></div>
			
			<post-item
				class="col-lg-6"
				v-bind:key="item.id"
				v-bind:post="item"
				v-for="item in listPostSearch"
				v-masonry-tile
			/>
		
		</div>
	</div>
</template>

<script>
	import PostItem from '../components/PostItem.vue';
	import {mapActions} from 'vuex';
	
	export default {
		name: 'search',
		components: {
			PostItem
		},
		data() {
			return {
				query: this.$route.query.query,
				listPostSearch: []
			}
		},
		watch: {
			'$route'(to, from) {
				this.query = to.query.query;
				this.checkQuery();
				this.fetchDataSearch()
			}
		},
		created() {
			this.checkQuery();
			this.fetchDataSearch();
		},
		methods: {
			...mapActions(['getListPostSearch']),
			checkQuery() {
				if (!this.query) {
					this.$router.push('/');
				}
			},
			fetchDataSearch() {
				if (this.query) {
					this.getListPostSearch(this.query).then(res => {
						if (res.ok) {
							this.listPostSearch = res.posts;
							// Data changed
							this.$redrawVueMasonry();
						}
					})
				}
			}
		}
	}
</script>

<style>
	.search-page {
		margin: 80px auto;
	}
	
	.search-info {
		padding-bottom: 30px;
	}
	
	mark, .mark {
		background-color: yellow;
		padding: 0;
	}
</style>
