<script context="module">
	import { getPokemonById } from '$lib/stores/poke-store';

	export async function load(ctx) {
		let { pokeId } = ctx.params;
		if (pokeId < 1 || pokeId > 898) {
			return { status: 302, redirect: '/' };
		}

		const pokeman = await getPokemonById(pokeId);

		return { props: { pokeman } };
	}
</script>

<script>
	import { goto } from '$app/navigation';

	export let pokeman;
	const type = pokeman.types[0].type.name;
</script>

<svelte:head>
	<title>Pokemon - {pokeman.name.toUpperCase()}</title>
</svelte:head>

<div class="flex flex-col items-center">
	<span class="items-center">
		<h1 class="inline-block text-4xl text-center my-8 uppercase ">{pokeman.name}</h1>
	</span>

	<p>
		Type: <strong>{type}</strong> | Height: <strong>{pokeman.height}</strong> | Weight:
		<strong>{pokeman.weight}</strong>
	</p>
	<img src={pokeman.sprites['front_default']} alt={pokeman.name} />

	<span>
		<button
			on:click={() => goto('/')}
			class="rounded items-center hover:bg-yellow-400 my-8 p-1 border-gray-600 border-2"
			>Back</button
		>
		{#if pokeman.id > 1}
			<button
				on:click={() => goto(`/pokemon/${pokeman.id - 1}`)}
				class="rounded items-center hover:bg-cyan-400 my-8 p-1 border-gray-600 border-2"
				>Prev</button
			>
		{/if}
		{#if pokeman.id < 898}
			<button
				on:click={() => goto(`/pokemon/${pokeman.id + 1}`)}
				class="rounded items-center hover:bg-cyan-400 my-8 p-1 border-gray-600 border-2"
				>Next</button
			>
		{/if}
	</span>
</div>
