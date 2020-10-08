<template>
	<div>
		djfkadsfja
	</div>
</template>

<script>
	import {mapActions} from "vuex";
	
	export default {
		name: "verify-email-token",
		methods: {
			...mapActions([
				'verifyEmail'
			]),
		},
		created() {
			console.log("verify-email-token", this.$route.params.token);
			let data = {token: this.$route.params.token};
			this.verifyEmail(data).then(res => {
				if (res.ok) {
					this.$router.push({name: 'login', query: {direction: this.$route.name}});
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
	}
</script>

<style scoped>

</style>
