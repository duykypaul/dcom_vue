<template>
	<div id="app">
		<comp-header v-if="isRenderHeader"/>
		<router-view/>
		<comp-footer v-if="isRenderFooter"/>
		<notifications group="notify" :duration="2000" position="bottom right"/>
		<app-loading :class="{show: isLoading}"/>
	</div>
</template>

<script>
	import CompHeader from "./components/CompHeader";
	import CompFooter from "./components/CompFooter";
	import AppLoading from "./components/AppLoading";
	import {mapActions, mapState} from "vuex";
	
	export default {
		name: 'app',
		components: {AppLoading, CompFooter, CompHeader},
		data() {
			return {}
		},
		computed: {
			...mapState(['isLoading']),
			isRenderHeader() {
				let arrRoutes = ['login', 'register', 'not-found', 'verify email'];
				let RouteName = this.$route.name;
				return arrRoutes.indexOf(RouteName) === -1;
			},
			isRenderFooter() {
				let arrRoutes = ['home', 'post-detail', 'not-found', 'verify email'];
				let RouteName = this.$route.name;
				return arrRoutes.indexOf(RouteName) === -1;
			}
		},
		methods: {
			...mapActions([
				'checkLogin'
			])
		},
		created() {
			this.checkLogin();
		}
	}
</script>

<style>
	.vue-notification-group {
		padding-right: 10px;
		padding-top: 10px;
	}
</style>
