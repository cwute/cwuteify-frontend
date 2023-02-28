<script>
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let song;
	export let isSearchResult = false;

	let tries = 0;

	async function getSongImage(songId) {
		let res = await fetch('https://api.cwute.dev/song/' + song.id + '/get-image', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		});
		if (res.status === 401) {
			window.location.replace('/login');
		}
		if (res.status === 200) {
			let blob = await res.blob();
			return URL.createObjectURL(blob);
		} else {
			throw new Error('Something went wrong on api server!');
		}
	}

	onMount(async () => {});

	function handleRemove() {
		if (tries == 1) {
			dispatch('removesong', { songId: song.id });
			tries = 0;
			return;
		}
		tries++;
	}

	function playSpecificSong() {
		dispatch('playsong', { data: song });
	}
</script>

<div class="bg-gray-700 rounded-xl text-white flex m-5 text-left">
	{#await getSongImage(song)}
		<h1 class="text-white">Trying to find the will to live... I mean loading...</h1>
	{:then image}
		<button on:click={playSpecificSong}>
			<img class="h-24 w-24 rounded-l-xl" src={image} alt="Song cover art" />
		</button>
	{/await}
	<div class="grid-rows-3 pl-2 sm:pl-3">
		<h1 class="font-bold text-1xl">{song.title}</h1>
		<h3 class="text-1xl">{song.artist}</h3>
		{#if !isSearchResult}
			{#if tries == 0}
				<button class="bg-red-600 rounded-full p-1 m-1" on:click={handleRemove}>Remove</button>
			{:else}
				<button class="bg-red-600 rounded-full p-1 m-1" on:click={handleRemove}
					>Are you sure?</button
				>
			{/if}
		{/if}
	</div>
</div>
