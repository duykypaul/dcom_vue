<template>
	<div class="ass1-comments__section">
		<router-link :to="getUserLink" class="ass1-comments__avatar ass1-avatar">
			<img alt="" :src="getAvatar"></router-link>
		<div class="ass1-comments__content">
			<router-link class="ass1-comments__name" :to="getUserLink">{{comment.user.username}}</router-link>
			<span class="ass1-comments__passed">{{formatTimeAdded}}</span>
			<p>{{comment.content}}</p>
			<div class="ass1-comments__info">
				<a class="ass1-comments__btn-upvote ass1-btn-icon" href="#">
					<i class="icon-Upvote"></i><span>{{comment.upVote}}</span></a>
				<a class="ass1-comments__btn-down ass1-btn-icon" href="#">
					<i class="icon-Downvote"></i><span>{{comment.downVote}}</span></a>
			</div>
		</div>
	</div>
</template>

<script>
	import {getAvatar} from "../helpers";
	import moment from "moment";
	
	export default {
		name: "post-comment-item",
		props: {
			comment: {type: Object, default: null}
		},
		computed : {
			getAvatar() {
				return getAvatar(this.comment.user.profilePicture);
			},
			getUserLink() {
				return {name: 'user-page', params: {id: this.comment.user.id}};
			},
			formatTimeAdded() {
				moment.locale(this.$i18n.locale);
				return moment(this.comment.createdAt).fromNow();
			},
		}
	}
</script>

<style scoped>
	.ass1-comments__avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 19px;
	}
	.ass1-comments__name {
		text-transform: capitalize;
	}
</style>
