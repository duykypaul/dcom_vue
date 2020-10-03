<template>
	<div class="ass1-login">
		
		<div class="ass1-login__logo">
			<router-link class="ass1-logo" to="/">DCOM Community</router-link>
		</div>
		<div class="ass1-login__content">
			<p>Đăng nhập</p>
			<div class="ass1-login__form">
				<form action="#">
					<div class="form-group" :class="{ 'form-group--error': $v.username.$error }">
						<input class="form-control" placeholder="Tên đăng nhập" required type="text" v-model.trim="$v.username.$model">
					</div>
					<div class="ass1-input-copy">
						<input class="form-control" placeholder="Mật khẩu" required type="password" v-model="password">
						<a href="#">Copy</a>
					</div>
					<div class="ass1-login__send">
						<router-link to="/register">Đăng ký tài khoản</router-link>
						<button @click.prevent="handleLogin" class="ass1-btn" type="submit">Đăng nhập</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex';
	import { required, minLength, alpha } from 'vuelidate/lib/validators'
	import {NOTIFY_IS_EMPTY} from "../../../../../intellij/vuejs/ShoppingCart_Vuex/src/constants/config";
	
	export default {
		name: "login-page",
		data() {
			return {
				username: '',
				password: ''
			}
		},
		validations: {
			username: {
				required,
				alpha,
				minLength: minLength(4)
			},
			password: {
				required,
				minLength: minLength(8)
			}
		},
		methods: {
			...mapActions([
				'actionLogin'
			]),
			handleLogin() {
				let data = {
					username: this.username,
					password: this.password
				};
				this.actionLogin(data).then(res => {
					if (!res.ok) {
						this.$notify({
							group: 'notify',
							type: 'error',
							title: 'Error!',
							text: res.error
						});
					} else {
						this.$router.push('/');
					}
				});
			}
		}
	}
</script>

<style scoped>
	.form-group--alert, .form-group--error {
		animation-name: shakeError;
		animation-fill-mode: forwards;
		animation-duration: .6s;
		animation-timing-function: ease-in-out;
	}
</style>
