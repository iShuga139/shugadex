<script>
	import { fade } from 'svelte/transition';

	export let pokemon;
</script>

<a
	in:fade
	href="/pokemon/{pokemon.id}"
	class="hover:bg-yellow-500 list-none p-6 m-2 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm flex flex-col items-center"
>
	<img class="h-30 w-30" src={pokemon.image} alt={pokemon.name} />
	<h2 class="uppercase text-xl">{pokemon.name}</h2>
</a>
