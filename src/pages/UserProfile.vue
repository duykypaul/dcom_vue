<template>
	<div class="ass1-login">
		<div class="ass1-login__content">
			<p>Profile</p>
			
			<div class="ass1-login__form">
				<div class="avatar">
					<img :src="getAvatarImage" alt="">
				</div>
				<form @submit.prevent="handleEditProfile" action="#" v-if="getCurrentUser">
					<input
						:value="getCurrentUser.username"
						class="form-control"
						placeholder="Tên ..." required="" type="text" v-on:input="username = $event.target.value">
					
					<select
						:value="getCurrentUser.gender"
						class="form-control"
						v-on:change="gender = $event.target.value"
					>
						<option disabled value="">Giới tính</option>
						<option value="nam">Nam</option>
						<option value="nu">Nữ</option>
					</select>
					<input class="form-control" name="avatar" placeholder="Ảnh đại diện" type="file"
					       v-on:change="uploadAvatar">
					<textarea
						:value="getCurrentUser.description"
						class="form-control"
						cols="30" placeholder="Mô tả ngắn ..." rows="5" v-on:input="description = $event.target.value">

					</textarea>
					<div class="ass1-login__send justify-content-center">
						<button class="ass1-btn" type="submit">Cập nhật</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	import {getAvatar} from "../helpers";
	
	export default {
		name: "user-profile",
		data() {
			return {
				username: '',
				gender: '',
				description: '',
				avatar: {
					objFile: null,
					base64: ''
				},
				userId: this.$route.params.id
			}
		},
		watch: {
			getCurrentUser() {
				this.checkCurrentUser();
			},
			$route(to, from) {
				this.userId = to.params.id;
				console.log("checkCurrentUser", "watch");
				this.checkCurrentUser();
			}
		},
		computed: {
			...mapGetters([
				'getCurrentUser'
			]),
			getAvatarImage() {
				console.log(this.getCurrentUser);
				if (this.avatar.base64 === '' && this.getCurrentUser) {
					return getAvatar(this.getCurrentUser.profilePicture);
				}
				return this.avatar.base64;
			}
			
		},
		methods: {
			...mapActions([
				'updateProfile'
			]),
			checkCurrentUser() {
				if (this.getCurrentUser.id && this.userId) {
					if (this.userId != this.getCurrentUser.id) {
						this.$router.push({name: 'home', query: {direction: this.$route.name}});
					}
				} else {
					console.log("chuwa load kip");
				}
			},
			handleEditProfile() {
				if (!this.gender) this.gender = this.getCurrentUser.gender;
				if (!this.username) this.username = this.getCurrentUser.username;
				if (!this.description) this.description = this.getCurrentUser.description;
				
				if (this.username && this.description && this.gender) {
					let data = {
						username: this.username,
						description: this.description,
						gender: this.gender,
						id: this.userId
					};
					
					if (this.avatar.objFile) {
						data.objFile = this.avatar.objFile;
					}
					
					this.updateProfile(data).then(res => {
						if (res.ok) {
							this.$notify({
								group: 'notify',
								type: 'success',
								title: 'Success!',
								text: 'Update thông tin Profile thành công!'
							});
							this.$router.push({name: 'user-page', query: {direction: this.$route.name}});
						} else {
							this.$notify({
								group: 'notify',
								type: 'error',
								title: 'Error!',
								text: res.error
							});
						}
					})
				}
			},
			uploadAvatar(e) {
				if (e.target.files && e.target.files[0]) {
					const avatarFile = e.target.files[0];
					
					let reader = new FileReader();
					reader.onload = (e) => {
						this.avatar.base64 = e.target.result;
						this.avatar.objFile = avatarFile;
					};
					reader.onerror = function (error) {
						alert(error);
					};
					reader.readAsDataURL(avatarFile);
				}
			}
		},
		created() {
			console.log("checkCurrentUser", "create");
			this.checkCurrentUser();
		}
	}
</script>

<style scoped>
	.avatar {
		border-radius: 50%;
		overflow: hidden;
	}
</style>
