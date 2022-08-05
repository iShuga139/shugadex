<script>
	import Header from '$lib/components/Header.svelte';
</script>

<container>
	<Header />
	<div class="m-5">
		<slot />
	</div>
</container>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
