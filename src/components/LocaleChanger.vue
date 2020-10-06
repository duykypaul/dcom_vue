<template>
	<div class="locale-changer">
		<label>
			<select v-model="$i18n.locale">
				<option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">{{ lang.name }}</option>
			</select>
		</label>
	</div>
</template>

<script>
	export default {
		name: "locale-changer",
		data () {
			return {
				langs: [
					{
						name : "English", code : 'en'
					},
					{
						name : "Việt Nam", code : 'vi'
					}
				],
			}
		},
		methods: {
			optionSelected: function (data) {
				this.$i18n.locale = data.code;
			}
		}
	}
</script>

<style scoped>

</style>
