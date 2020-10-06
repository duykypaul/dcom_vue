<template>
	<div class="container">
		<!--sections-->
		<div class="row">
			<div class="col-lg-8">
				<!--section-->
				<div class="ass1-section ass1-section__edit-post">
					<div class="ass1-section__content">
						<form action="#">
							<div class="form-group">
								<input class="form-control ttg-border-none" placeholder="https://" type="text" v-model="urlImage">
							</div>
							<div class="form-group">
									<textarea class="form-control ttg-border-none" placeholder="Mô tả ..." type="text"
									          v-model="content">
									</textarea>
							</div>
						</form>
						<div class="ass1-section__image">
							<a href="#"><img :src="renderImage" alt="default"></a>
						</div>
						<a class="ass1-btn ass1-btn-meme" href="https://memeful.com/" target="_blank">Chế ảnh từ
							meme</a>
						<button @click="UploadImageFromLocal" class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</button>
						<input
							@change="imageUpload"
							name="imageUpload"
							placeholder="Ảnh đại diện"
							ref="imageUpload"
							style="display: none"
							type="file"
						>
					</div>
				</div>
			</div>
			<div class="col-lg-4">
				<aside class="ass1-aside ass1-aside__edit-post">
					<div>
						<button @click.prevent="handlePostUpload" class="ass1-btn" href="#">Đăng bài</button>
					</div>
					<div class="ass1-aside__edit-post-head">
						<span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
						<label :key="item.id"
						       class="ass1-checkbox"
						       v-for="item in lstCategories"
						>
							<input :value="item.id" name="state-post" type="checkbox" v-model="categories">
							<span></span>
							<p>{{item.text}}</p>
						</label>
					</div>
					<div class="ass1-aside__get-code">
						<p>Share Link</p>
					</div>
					<div class="ass1-aside__social">
						<a class="ass1-btn-social__facebook ass1-btn-social" href=""><i aria-hidden="true"
						                                                                class="fa fa-facebook"></i></a>
						<a class="ass1-btn-social__twitter ass1-btn-social" href=""><i aria-hidden="true"
						                                                               class="fa fa-twitter"></i></a>
						<a class="ass1-btn-social__google ass1-btn-social" href=""><i aria-hidden="true"
						                                                              class="fa fa-google-plus"></i></a>
					</div>
				
				</aside>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState} from "vuex";
	import {checkImageFile, checkImageURL} from "../helpers";
	
	export default {
		name: "post-upload",
		data() {
			return {
				objImage: {
					objFile: null,
					base64URL: ''
				},
				urlImage: '',
				content: '',
				categories: []
			}
		},
		computed: {
			renderImage() {
				if (this.urlImage) {
					return this.urlImage;
				} else if (this.objImage.base64URL) {
					return this.objImage.base64URL;
				}
				return '/dist/images/no_image_available.jpg';
			},
			...mapState({
				lstCategories: state => state.post.categories
			})
		},
		methods: {
			...mapActions([
				'createNewPost'
			]),
			UploadImageFromLocal() {
				this.$refs.imageUpload.click();
			},
			imageUpload(e) {
				if (e.target.files && e.target.files[0]) {
					const imageFile = e.target.files[0];
					if (!checkImageFile(imageFile)) {
						this.$notify({
							group: 'notify',
							type: 'error',
							title: 'Error!',
							text: 'file tải lên không hợp lệ'
						});
						return;
					}
					let reader = new FileReader();
					reader.onload = (e) => {
						this.objImage.base64URL = e.target.result;
						this.objImage.objFile = imageFile;
					};
					reader.onerror = function (error) {
						alert(error);
					};
					reader.readAsDataURL(imageFile);
				}
			},
			handlePostUpload() {
				let {objImage, content, urlImage, categories} = this;
				if (content && categories.length) {
					if (urlImage || objImage.base64URL) {
						let data = {
							content,
							categories
						};
						if (!checkImageURL(urlImage)) {
							if (objImage.base64URL) {
								data.objImage = objImage.objFile;
							} else {
								this.$notify({
									group: 'notify',
									type: 'error',
									title: 'Error!',
									text: 'vui lòng chọn link hình ảnh hợp lệ hoặc tải ảnh lên từ máy tính'
								});
								return;
							}
						} else {
							data.urlImage = urlImage;
						}
						this.createNewPost(data).then(res => {
							if (res.ok) {
								this.$notify({
									group: 'notify',
									type: 'success',
									title: 'Success!',
									text: 'đăng bài viết thành công'
								});
								this.resetData();
							} else {
								this.$notify({
									group: 'notify',
									type: 'error',
									title: 'Error!',
									text: res.error
								});
							}
						});
					} else {
						this.$notify({
							group: 'notify',
							type: 'error',
							title: 'Error!',
							text: 'vui lòng chọn hình ảnh bài viết'
						});
					}
				} else {
					this.$notify({
						group: 'notify',
						type: 'error',
						title: 'Error!',
						text: 'Vui lòng nhập đầy đủ nội dung'
					});
				}
			},
			resetData() {
				this.objImage = {
					base64URL: '',
					objFile: null
				};
				this.urlImage = '';
				this.categories = [];
				this.content = ''
			}
		}
	}
</script>

<style scoped>
	.row {
		margin: 40px auto;
	}
</style>
