<script>
	//@ts-nocheck
	import { createEventDispatcher, onMount } from 'svelte';
	import Song from './Song.svelte';

	const dispatch = createEventDispatcher();

	let query;
	let results = Array();

	function handleSearch() {
		if (query === undefined || query === null || query === '' || query.length < 1) {
			results = Array();
			return;
		}
		fetch('https://api.cwute.dev/song/search/' + query, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				results = data;
			});
	}

	function handleSongClick(song) {
		dispatch('songClick', { data: song.id });
	}

	function handleClear() {
		query = '';
		results = Array();
	}
</script>

<div class="text-black">
	<div class="flex">
		<input class="w-full block sm:p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" on:change={handleSearch} bind:value={query} />
		<button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={handleClear}>Clear</button>
	</div>
	<div class="grid overflow-auto h-80  sm:h-[600px]">
		{#each results as result}
			<button
				class=""
				on:click={() => {
					handleSongClick(result);
				}}
			>
				<Song song={result} isSearchResult={true} />
			</button>
		{/each}
	</div>
</div>
