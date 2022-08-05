<script>
	import { onMount } from 'svelte';

	import PokeCard from '$lib/components/PokeCard.svelte';
	import { fetchRegion, Pokemon, Region } from '$lib/stores/poke-store';

	let pokemonToSearch = '';
	let filteredPokemon = [];

	const regions = [
		{ id: '1', name: 'Kanto', limit: 151 },
		{ id: '2', name: 'Johto', limit: 100, offset: 151 },
		{ id: '3', name: 'Hoenn', limit: 135, offset: 251 },
		{ id: '4', name: 'Sinnoh', limit: 108, offset: 386 },
		{ id: '6', name: 'Unova', limit: 155, offset: 494 },
		{ id: '7', name: 'Kalos', limit: 72, offset: 649 },
		{ id: '8', name: 'Alola', limit: 88, offset: 721 },
		{ id: '9', name: 'Galar & Hisui', limit: 89, offset: 809 }
	];

	$: {
		if (pokemonToSearch) {
			filteredPokemon = $Pokemon.filter((poke) =>
				poke.name.toLowerCase().includes(pokemonToSearch.toLowerCase())
			);
		} else {
			filteredPokemon = [...$Pokemon];
		}
	}

	const searchFromRegion = () => {
		pokemonToSearch = '';
		const currentRegion = regions.find(({ id }) => id === $Region);
		return fetchRegion(currentRegion);
	};

	onMount(() => {
		const currentRegion = regions.find(({ id }) => id === $Region);
		return fetchRegion(currentRegion);
	});
</script>

<svelte:head>
	<title>SHUGADEX</title>
</svelte:head>

<section>
	<div class="grid justify-items-center align-middle">
		<div class="grid grid-flow-row">
			<label >Region:
				<select class="w-[254px] m-2" bind:value={$Region} on:change={searchFromRegion}>
					{#each regions as region}
						<option value={region.id}>{region.name}</option>
					{/each}
				</select>
			</label>
			<span class="flex">
				<input
					class="w-72 border-solid border-2 rounded m-2"
					placeholder=" Search Pokemon"
					bind:value={pokemonToSearch}
				/>
				<svg viewBox="0 0 460 512" class="w-4">
					<path
						d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z"
					/>
				</svg>
			</span>
		</div>
	</div>

	<div class="overflow-auto py-1 grid gap-2 md:grid-cols-4 xl:grid-cols-6 md:max-h-[200px] xl:max-h-[600px]">
		{#each filteredPokemon as pokeman}
			<PokeCard pokemon={pokeman} />
		{/each}
	</div>
</section>
