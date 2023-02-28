<script>
	//@ts-nocheck
	import { onMount, createEventDispatcher } from 'svelte';
	import Song from './Song.svelte';

	export let playlist;

	const dispatch = createEventDispatcher();

	let { name, description, lastEdited, created, createdBy } = playlist;
	let loading = false;

	onMount(async () => {
		fetchPlaylist(playlist.id);
	});

	function fetchPlaylistDispatch() {
		dispatch('playlistUpdate');
	}

	function removeSongFromPlaylist(event) {
		fetch('https://api.cwute.dev/playlist/' + playlist.id + '/remove/' + event.detail.songId, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res)
			.then((data) => {
				if (data.ok) {
					loading = false;
					fetchPlaylist(playlist.id);
					dispatch('songRemoved', { songId: event.detail.songId });
				}
				if (data.status == 404) {
					alert('Song not found in playlist');
				}
				if (data.status == 401) {
					window.location.replace('/login');
				}
			});
	}

	function fetchPlaylist(id) {
		fetch('https://api.cwute.dev/playlist/' + id, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res)
			.then((data) => {
				if (data.status == 200) {
					//this mf again. I geniunenly wanna find out why this works
					setTimeout(() => {
						data.json().then((data) => {
							fetchPlaylistDispatch();
							playlist = data;
							loading = true;
						});
					}, 0);
				}
				if (data.status == 404) {
					alert('Song not found in playlist');
				}
				if (data.status == 401) {
					window.location.replace('/login');
				}
			});
	}

	function sendPlaySong(event) {
		dispatch('playsong', { song: event.detail.data });
	}
</script>

<div class="pr-0">
	<div class="text-left pl-5">
		<h1 class="text-3xl"><span class="font-bold">Name:</span> {name}</h1>
		<h3 class="text-2xl"><span class="font-bold">Description:</span> {description}</h3>
		<div class="flex pr-5 mr-5">
			<h3 class="pr-5"><span class="font-bold">Edited at:</span> {lastEdited}</h3>
			<h3 class=""><span class="font-bold">Created at:</span> {created}</h3>
		</div>
		<h3 class=""><span class="font-bold">Created by:</span> {createdBy}</h3>
		<h3 class=""><span class="font-bold">Songs count:</span> {playlist.songs.length}</h3>
	</div>
</div>
<div class="sm:grid sm:grid-cols-3">
	<div class="col-span-3">
		{#if loading}
			<div class="sm:grid sm:grid-cols-2">
				{#each playlist.songs as song}
					<Song {song} on:removesong={removeSongFromPlaylist} on:playsong />
				{/each}
			</div>
		{:else}
			<h1 class="text-white text-center text-3xl">
				Trying to find the will to live... I mean loading...
			</h1>
		{/if}
	</div>
</div>
