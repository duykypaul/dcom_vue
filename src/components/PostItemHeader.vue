<template>
	<div class="ass1-section__head">
		<router-link :to="getUserLink" class="ass1-section__avatar ass1-avatar">
			<img :src="getImageAvatar" alt="undefine">
		</router-link>
		<div>
			<RouterLink :to="getUserLink" class="ass1-section__name" v-html="formatFullname"></RouterLink>
			<span class="ass1-section__passed">{{formatTimeAdded}}</span>
		</div>
		<router-link :to="getUserLink" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></router-link>
	</div>
</template>

<script>
	import moment from 'moment';
	import {replaceAll} from "../helpers";
	
	export default {
		name: "post-item-header",
		data() {
			return {
				querySearch: this.$route.query.query,
			}
		},
		props: {
			post: {type: Object, default: null}
		},
		computed: {
			getUserLink() {
				return {name: 'user-page', params: {id: this.post.user.id}};
			},
			formatTimeAdded() {
				moment.locale('vi');
				return moment(this.post.createdAt).fromNow();
			},
			getImageAvatar() {
				if (this.post.user.profilePicture) {
					return this.post.user.profilePicture;
				}
				return '/dist/images/avatar-02.png';
			},
			formatFullname() {
				if (this.querySearch) {
					// Replace html
					return replaceAll(this.post.username, this.querySearch, `<mark>${this.querySearch}</mark>`)
				} else {
					return this.post.user.username;
				}
			}
		}
	}
</script>

<style scoped>
	.ass1-section__avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.ass1-section__name {
		text-transform: capitalize;
	}
</style>
