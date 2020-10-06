<template>
	<div class="ass1-head-user" v-if="user">
		<div class="ass1-head-user__content">
			<div class="ass1-head-user__image">
				<a href="#">
					<img :alt="user.username" :src="getAvatar">
				</a>
			</div>
			<div class="ass1-head-user__info">
				<div class="ass1-head-user__info-head">
					<div class="ass1-head-user__name">
						<span>{{user.username}}</span>
						<i><img alt="" src="/dist/fonts/emotion/svg/Verified.svg"></i>
					</div>
					<div class="w-100"></div>
					
					<a class="ass1-head-user__btn-follow ass1-btn" href="#" v-if="!isCurrentUser">Theo dõi</a>
					
					<template v-else>
						<router-link
							:to="{name: 'change-password', params: {id: user.id}}"
							class="ass1-head-user__btn-follow ass1-btn"
						>Đổi mật khẩu
						</router-link>
						<router-link
							:to="{name: 'user-profile', params: {id: user.id}}"
							class="ass1-head-user__btn-follow ass1-btn"
						>Profile
						</router-link>
					</template>
					<!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
				</div>
				<div class="ass1-head-user__info-statistic">
					<div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{countPost}}</span></div>
					<div class="ass1-btn-icon"><i class="icon-Followers"></i><span>Theo dõi: {{user.yourViewed}}</span>
					</div>
					<div class="ass1-btn-icon"><i
						class="icon-Following"></i><span>Đang theo dõi: {{user.youViewed}}</span></div>
					<!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
				</div>
				<p>{{user.description}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from "vuex";
	import {getAvatar} from "../helpers";
	
	export default {
		name: "user-page-info",
		props: {
			user: {type: Object, default: null},
			countPost: {type: Number, default: 0}
		},
		computed: {
			...mapGetters([
				'getCurrentUser'
			]),
			getAvatar() {
				return getAvatar(this.getCurrentUser.profilePicture);
			},
			isCurrentUser() {
				if (this.getCurrentUser) {
					return this.$route.params.id == this.getCurrentUser.id;
				}
			}
		}
	}
</script>

<style scoped>

</style>
