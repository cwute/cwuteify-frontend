<script>
	//@ts-nocheck
	import { onMount } from 'svelte';

	onMount(() => {
		document.getElementById('songForm').addEventListener('submit', function (event) {
			event.preventDefault();
			fetch('https://api.cwute.dev/song/add', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + sessionStorage.getItem('token')
				},
				body: new FormData(event.target)
			})
				.then((response) => {
					if (response.status === 200) {
						window.location.replace('/dashboard');
					}
					if (response.status === 401 || response.status === 403) {
						window.location.replace('/dashboard');
					}
					if (response.status === 400 || response.status === 500) {
						alert('Something went wrong');
					}
				})
				.catch((error) => {});
		});
	});
</script>

<div class="text-center">
	<div class="text-white font-bold pt-10">
		<h1 class="text-3xl">Create song</h1>
	</div>
	<form id="songForm" class="pt-14 pr-14 pl-14 pb-7 sm:pl-96 sm:pr-96">
		<div class="mb-6">
			<label class="text-left block mb-2 text-sm font-medium text-white" for="title">Title:</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="title"
				id="title"
				required
			/>
		</div>
		<div class="mb-6">
			<label class="text-left block mb-2 text-sm font-medium text-white" for="artist">Artist:</label
			>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="artist"
				id="artist"
				required
			/>
		</div>
		<div class="mb-6">
			<label class="text-left block mb-2 text-sm font-medium text-white" for="image">Image:</label>
			<input
				class="block w-full text-lg text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				type="file"
				name="image"
				id="image"
				required
			/>
			<p class="mt-2 text-white text-sm ">Note that large file sizes will take longer to load.</p>
		</div>
		<div class="mb-6">
			<label class="text-left block mb-2 text-sm font-medium text-white" for="song">Song:</label>
			<input
				class="block w-full text-lg text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				type="file"
				name="song"
				id="song"
				required
			/>
			<p class="mt-2 text-white text-sm ">Note that large file sizes will take longer to load.</p>
		</div>
		<input
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			type="submit"
			value="Submit"
		/>
	</form>
	<a class="text-white" href="/dashboard">Go back</a>
</div>
