<template>
	<div class="ass1-add-comment">
		<form action="#" @submit="handleSendComment">
			<textarea class="form-control ttg-border-none" placeholder="Thêm một bình luận"
			          v-model="content"
			          @keydown.enter.exact.prevent
			          @keyup.enter.exact="handleSendComment"
			          @shift.enter.exact="newline"
			          :maxlength="maxLength"
			          rows="3" cols="50"
			></textarea>
		</form>
		<div class="ass1-add-comment__content">
			<a class="ass1-add-comment__btn-save ass1-btn-icon" href="#" @click.prevent="handleSendComment"><span>{{ renderCommentLength }}</span>
				<i class="icon-Submit_Tick"></i></a>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from "vuex";
	
	export default {
		name: "post-comment-add",
		data() {
			return {
				content: '',
				postId: this.$route.params.id,
				maxLength: 255
			}
		},
		watch: {
			'$route'(to, from) {
				console.log(this.postId);
				this.postId = to.params.id;
			}
		},
		computed: {
			...mapGetters([
				'getCurrentUser'
			]),
			renderCommentLength() {
				return this.maxLength - this.content.length;
			}
		},
		methods: {
			...mapActions(['addCommentToPostDetail']),
			handleSendComment() {
				let data = {
					content: this.content,
					userId: this.getCurrentUser.id,
					postId: this.postId
				};
				this.addCommentToPostDetail(data).then(res =>{
					if (res.ok) {
						this.$notify({
							group: 'notify',
							type: 'success',
							title: 'Success!',
							text: 'đăng bình luận thành công'
						});
						this.content = '';
					} else {
						this.$notify({
							group: 'notify',
							type: 'error',
							title: 'Error!',
							text: res.error
						});
					}
				})
			},
			newline() {
				this.content = `${this.content}\n`;
			},
		}
	}
</script>

<style scoped>

</style>
