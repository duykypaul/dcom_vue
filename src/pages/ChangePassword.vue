<template>
	<div class="ass1-login">
		<div class="ass1-login__content">
			<p>Đổi mật khẩu</p>
			<div class="ass1-login__form">
				<form @submit.prevent="handleChangePassword" action="#">
					<input class="form-control" placeholder="Mật khẩu cũ" required type="password" v-model="oldPassword">
					<div class="error" v-if="!$v.oldPassword.required">Password is required.</div>
					<input class="form-control" placeholder="Mật khẩu mới" required type="password" v-model="newPassword">
					<input class="form-control" placeholder="Xác nhận mật khẩu mới" required type="password" v-model="reNewPassword">
					<div class="ass1-login__send justify-content-center">
						<button class="ass1-btn" type="submit">Gửi</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, sameAs, minLength } from 'vuelidate/lib/validators';
	import {mapActions, mapGetters} from "vuex";
	
	export default {
		name: "change-password",
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				reNewPassword: '',
				userId: this.$route.params.id
			}
		},
		validations: {
			oldPassword: {
				required,
				minLength: minLength(6)
			},
			newPassword: {
				required,
				minLength: minLength(6)
			},
			reNewPassword: {
				sameAsPassword: sameAs('newPassword')
			}
		},
		watch: {
			getCurrentUser() {
				this.checkCurrentUser();
			},
			'$route'(to, from) {
				this.userId = to.params.id;
				console.log("checkCurrentUser, watch");
				this.checkCurrentUser();
			}
		},
		computed: {
			...mapGetters([
				'getCurrentUser'
			])
		},
		created() {
			this.checkCurrentUser();
		},
		methods: {
			...mapActions([
				'changePassword'
			]),
			checkCurrentUser() {
				if (this.getCurrentUser.id && this.userId) {
					if (this.userId !== this.getCurrentUser.id) {
						this.$router.push({name: 'home', query: {direction: this.$route.name}});
					}
				}
			},
			handleChangePassword() {
				let {oldPassword, newPassword, reNewPassword} = this;
				if (oldPassword && newPassword && reNewPassword) {
					if (oldPassword == newPassword) {
						alert('Mật khẩu cũ không được trùng với mật khẩu mới');
					} else if (newPassword != reNewPassword) {
						alert('Mật khẩu nhập lại không khớp');
					} else {
						let data = {
							oldPassword,
							newPassword,
							reNewPassword
						};
						this.changePassword(data).then(res => {
							if (res.ok) {
								alert(res.message);
								this.$router.push('/');
							} else {
								alert(res.error);
							}
						})
					}
				}
			}
		}
	}
</script>

<style scoped>

</style>
