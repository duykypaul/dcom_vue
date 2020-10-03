<template>
	<div style="">
		<b-card
		  img-src="https://picsum.photos/600/300/?image=25"
		  img-alt="Image"
		  img-top
		  tag="article"
		  style="max-width: 30rem; margin: 20vh auto; text-align: center"
		  class="mb-2"
		>
			<b-card-title style="font-weight: 700; text-align: center">Thanks for signing up!</b-card-title>
			<b-card-text>
				Please verify email address to get access to Dcom community.
			</b-card-text >
			<br>
			<b-card-text style="font-weight: 400; color: #fff801">
				Thank You!
			</b-card-text>
			<br>
			<b-button href="https://mail.google.com/" variant="primary">Verify Email Now</b-button>
		</b-card>
	</div>
</template>

<script>
	export default {
		name: "verify-email"
	}
</script>

<style scoped>

</style>
