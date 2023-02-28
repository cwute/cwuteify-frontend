<script>
	//@ts-nocheck
	import { onDestroy, onMount } from 'svelte';
	import Playlist from '../../Components/Playlist.svelte';
	import Navbar from '../../Components/Navbar.svelte';
	import Search from '../../Components/Search.svelte';

	let playlists = Array();
	let activePlaylist = undefined;
	let loading = true;
	let reloadingPlaylist = false;
	let username = 'No xss here!';

	onMount(async () => {
		if (sessionStorage.getItem('token') === null) {
			window.location.replace('/login');
		}

		fetch('/api/username', {
			method: 'POST',
			body: JSON.stringify({ token: sessionStorage.getItem('token') })
		})
			.then((res) => res.json())
			.then((data) => {
				username = data.username;
			});

		getPlaylists();
		if (playlists.length > 0) {
			activePlaylist = playlists[0];
		}
		audio = new Audio();

		setTimeout(() => {
			audio.addEventListener('timeupdate', () => {
				updateProgress();
			});
			audio.addEventListener('ended', () => {
				nextSong();
			});
		}, 100);
	});

	onDestroy(() => {
		if (audio !== undefined) {
			audio.pause();
		}
	});

	function getPlaylists() {
		fetch('https://api.cwute.dev/playlist/list', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.status === 401) {
					window.location.replace('/login');
				}
				if (res.status === 200) {
					return res.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				playlists = data;
				if (playlists.length > 0) {
					playlists.sort((a, b) => (a.lastEdited < b.lastEdited ? 1 : -1));
					if (activePlaylist === undefined) {
						activePlaylist = playlists[0];
						songQueue = activePlaylist.songs;
					}
				}
				loading = false;
			});
	}

	function setActivePlaylist(playlist) {
		if (playlist.name === activePlaylist.name) return;
		loading = true;
		deletePlaylist = false;
		activePlaylist = { ...playlist };
		// I have geniuenly no idea why this is needed, but it is.
		setTimeout(() => {
			audio.pause();
			songQueue = activePlaylist.songs;
			songsPlayed = Array();
			loading = false;
		}, 0);
	}

	function addSongToPlaylist(event) {
		if (activePlaylist === undefined) {
			alert('Please create a playlist first');
			return;
		}
		fetch('https://api.cwute.dev/playlist/' + activePlaylist.id + '/add/' + event.detail.data, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res)
			.then((data) => {
				if (data.status == 200) {
					loading = false;
					addSong(event);
					setTimeout(() => {
						reloadingPlaylist = true;
						getPlaylists();
						setTimeout(() => {
							reloadingPlaylist = false;
						}, 100);
					}, 100);
					return;
				}
				if (data.status == 404) {
					alert('Song not found in playlist');
				}
				if (data.status == 401) {
					window.location.replace('/login');
				}
				if (data.status == 400) {
					alert('Song already in playlist');
				} else {
					throw new Error('Something went wrong');
				}
			});
	}

	let deletePlaylist = false;
	function removePlaylist() {
		if (deletePlaylist) {
			fetch('https://api.cwute.dev/playlist/' + activePlaylist.id + '/delete', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + sessionStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res)
				.then((data) => {
					if (data.status == 200) {
						reloadingPlaylist = false;
						setTimeout(() => {
							reloadingPlaylist = true;
							playlists = Array();
							getPlaylists();
							setTimeout(() => {
								if (playlists.length > 0) {
									activePlaylist = playlists[0];
									deletePlaylist = false;
								} else {
									activePlaylist = undefined;
									deletePlaylist = false;
								}
								reloadingPlaylist = false;
							}, 0);
						}, 0);
						return;
					}
					if (data.status == 404) {
						alert('Playlist not found');
					}
					if (data.status == 401) {
						window.location.replace('/login');
					}
					if (data.status == 403) {
						alert('You are not allowed to delete this playlist');
					} else {
						throw new Error('Something went wrong');
					}
				});
		} else {
			deletePlaylist = true;
		}
	}

	//AUDIO CONTROLS PART
	let audio = undefined;
	let songQueue = Array();
	let songsPlayed = Array();
	let currentSong = undefined;

	let curTime = '0:00';
	let duration = '0:00';
	let title = 'No song playing';
	let artist = '';

	function playSpecificSong(event) {
		const song = event.detail.data;
		audio.pause();
		songsPlayed.push(currentSong);
		songsPlayed.push(song);
		currentSong = song;
		fetchSongMusic(song);
	}

	function getCurrentTime() {
		const minutes = Math.floor(audio.currentTime / 60);
		const seconds = Math.floor(audio.currentTime - minutes * 60);
		if (seconds < 10) {
			return minutes + ':0' + seconds;
		} else {
			return minutes + ':' + seconds;
		}
	}

	function getDurationTime() {
		const minutes = Math.floor(audio.duration / 60);
		const seconds = Math.floor(audio.duration - minutes * 60);
		if (seconds < 10) {
			return minutes + ':0' + seconds;
		} else {
			return minutes + ':' + seconds;
		}
	}

	function resetProgress() {
		curTime = '0:00'.toString();
		duration = '0:00'.toString();
		const progressBar = document.getElementById('progress-bar');
		progressBar.style.width = '45%';
		title = 'No song playing';
		artist = '';
	}

	function updateProgress() {
		curTime = getCurrentTime();
		duration = getDurationTime();
		calculateProgress();
		artist = currentSong.artist;
		title = currentSong.title;
	}

	function calculateProgress() {
		const progressBar = document.getElementById('progress-bar');
		progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
	}

	function playPause() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}

	function fetchSongMusic() {
		if (audio != undefined) {
			audio.pause();
		}
		fetch('https://api.cwute.dev/song/' + currentSong.id + '/get-track', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.status === 401) {
				window.location.replace('/login');
			}
			if (res.status === 200) {
				res.blob().then((blob) => {
					audio.src = URL.createObjectURL(blob);
					audio.load();
					fetchImage();
					audio.play();
				});
			} else {
				throw new Error('Something went wrong on api server!');
			}
		});
	}

	function nextSong() {
		audio.pause();
		songsPlayed.push(currentSong);
		songQueue = songQueue.filter((song) => song.id !== currentSong.id);
		if (songQueue.length === 0) {
			songQueue = Array();
			document.getElementById('active-song').src = 'unselected-song.png';
			audio.src = '';
			audio.load();
			resetProgress();
		} else {
			if (document.getElementById('shuffle').checked) {
				currentSong = songQueue[Math.floor(Math.random() * songQueue.length)];
			} else {
				currentSong = songQueue[0];
			}
			setTimeout(() => {
				fetchSongMusic();
			}, 100);
		}
	}

	function previousSong() {
		audio.pause();
		resetProgress();
		if (songsPlayed.length === 0) return;
		songQueue.push(currentSong);
		currentSong = songsPlayed.pop();
		fetchSongMusic();
	}

	function removeSong(event) {
		activePlaylist.songs = activePlaylist.songs.filter((song) => song.id !== event.detail.songId);
		if (currentSong != undefined && currentSong.id === event.detail.songId) {
			resetProgress();
			nextSong();
			songsPlayed = songsPlayed.filter((song) => song.id !== event.detail.songId);
		}
		songQueue = songQueue.filter((song) => song.id !== event.detail.songId);
	}

	function playPlaylist() {
		songsPlayed = Array();
		songQueue = activePlaylist.songs;
		if (songQueue.length === 0) {
			alert('No songs in playlist');
			return;
		}
		if (document.getElementById('shuffle').checked) {
			currentSong = songQueue[Math.floor(Math.random() * songQueue.length)];
		} else {
			currentSong = songQueue[0];
		}
		fetchSongMusic();
	}

	function addSong(event) {
		const id = event.detail.data;
		fetch('https://api.cwute.dev/song/' + id + '/get', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				songQueue.push(data);
			});
	}

	function changeProgress(event) {
		const percentage = event.offsetX / event.target.offsetWidth;

		if (Number.isFinite(audio.duration) && Number.isFinite(percentage)) {
			audio.currentTime = audio.duration * percentage;
		}
	}

	function onAudioVolumeSliderChange(event) {
		audio.volume = event.target.value / 100;
	}

	function fetchImage() {
		fetch('https://api.cwute.dev/song/' + currentSong.id + '/get-image', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + sessionStorage.getItem('token')
			}
		}).then((res) => {
			if (res.status === 401) {
				window.location.replace('/login');
			}
			res.blob().then((blob) => {
				let url = URL.createObjectURL(blob);
				document.getElementById('active-song').src = url;
			});
		});
	}
</script>

{#if loading}
	<h1 class="text-white text-center text-3xl">
		Trying to find the will to live... I mean loading...
	</h1>
{:else}
	<Navbar />
	<h1 class="text-center text-3xl  text-white pb-2 font-bold pr-0 mr-0">Welcome back: {username}!</h1>
	<div class="text-white pl-5 sm:pr-5">
		<div class="sm:row-span-2 sm:gap-3  sm:grid sm:grid-cols-6">
			<div
				class="sm:col-span-1 bg-gray-800 sm:p-4 sm:mb-5 mb-10 sm:text-center overflow-auto h-48 sm:h-[640px] rounded-xl"
			>
				<div class="grid grid-rows-1 gap-3">
					<h1 class="text-3xl font-bold text-center">Your playlists:</h1>
					{#if playlists.length === 0}
						<h1 class="text-center">You have no playlists</h1>
					{:else}
						{#each playlists as playlist}
							<div class="border border-black sm:m-1 rounded-xl row-span-1">
								<button on:click={setActivePlaylist(playlist)}
									><div class="p-5">
										<h1>Name: {playlist.name}</h1>
										<p>Description: {playlist.description}</p>
									</div>
								</button>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div
				class="pt-10 mb-10 sm:mb-0 sm:pt-0 col-span-4 bg-gray-800 sm:h-[640px] h-96 overflow-auto rounded-xl"
			>
				{#if !reloadingPlaylist}
					{#if playlists.length === 0}
						<div class="sm:grid grid-rows-3">
							<div class="row-span-1 text-center">
								<h1 class="text-3xl font-bold">You have no playlists</h1>
							</div>
							<div class="row-span-2 flex justify-center">
								<img src="peakon.jpg" alt="peakon" class="w-96 h-96" />
							</div>
						</div>
					{:else}
						<div class="flex items-center sm:m-4">
							<input
								id="shuffle"
								type="checkbox"
								class="w-4 h-4 sm:ml-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="default-checkbox"
								class="sm:ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Shuffle?</label
							>
						</div>
						<div class="flex justify-between">
							<button class="p-3 sm:ml-5 rounded-full bg-blue-600" on:click={playPlaylist}
								>Play playlist</button
							>
							{#if deletePlaylist}
								<button class="p-3 rounded-full bg-red-500" on:click={removePlaylist}
									>Are you sure?</button
								>
							{:else}
								<button class="p-3 rounded-full bg-red-500" on:click={removePlaylist}
									>Delete playlist</button
								>
							{/if}
						</div>
						<Playlist
							playlist={activePlaylist}
							on:playlistUpdate={getPlaylists}
							on:songRemoved={removeSong}
							on:songAdded={addSong}
							on:playsong={playSpecificSong}
						/>
					{/if}
				{:else}
					<h1 class="text-3xl font-bold text-center">
						Trying to find the will to live... I mean loading...
					</h1>
				{/if}
			</div>
			<div class="col-span-1 rounded-xl bg-gray-800 h-96 sm:h-[640px]">
				<Search on:songClick={addSongToPlaylist} />
			</div>
		</div>
		<div class="pt-5 sm:grid sm:grid-cols-6 sm:gap-5">
			<div class="sm:col-span-1 sm:flex flex text-center">
				<img
					class="h-36 w-36 sm:h-20 sm:w-20"
					id="active-song"
					src="unselected-song.png"
					alt="song"
				/>
				<div class="pl-5 grid grid-rows-2 sm:text-left">
					<h1 class="text-2xl font-bold">{title}</h1>
					<h1 class="text-1xl font-bold">{artist}</h1>
				</div>
			</div>
			<div class="sm:col-span-4 pt-5">
				<div class="row-span-1 flex justify-center">
					<h3 class="pr-5">{curTime}</h3>
					<button on:click={changeProgress}>
						<div class="w-56 sm:w-96 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
							<div id="progress-bar" class="bg-blue-600 h-2.5 rounded-full" style="width: 33%" />
						</div></button
					>
					<h3 class="pl-5">{duration}</h3>
				</div>
				<div class="flex justify-center">
					<button class="pr-10" on:click={previousSong}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
							/>
						</svg>
					</button>
					<button on:click={playPause}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
							/>
						</svg>
					</button>
					<button class="pl-10" on:click={nextSong}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div class="sm:block hidden sm:flex sm:justify-end sm:col-span-1">
				<input
					class="sm:w-full"
					type="range"
					id="audio-slider"
					on:change={onAudioVolumeSliderChange}
				/>
			</div>
		</div>
	</div>
{/if}
