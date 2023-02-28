<script>
	//@ts-nocheck
	function handleSubmission() {
		let name = document.getElementById('name').value;
		let description = document.getElementById('description').value;

		if (name === '') {
			alert('Name is required');
			return;
		}

		if (description === '') {
			description = 'No description provided';
		}

		fetch('https://api.cwute.dev/playlist/create', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, description })
		})
			.then((res) => res)
			.then((data) => {
				if (data.status === 200) {
					alert('Playlist created');
					window.location.replace('/dashboard');
				}
				if (data.status === 401) {
					window.location.replace('/login');
				}

				if (data.status === 400 || data.status === 500) {
					alert('Something went wrong');
				}
			});
	}
</script>

<div class="text-center">
	<div class="text-white font-bold pt-10">
		<h1>Create playlist</h1>
	</div>
	<form class="pt-14 pr-14 pl-14 pb-7 sm:pl-96 sm:pr-96" onsubmit="return false">
		<div class="mb-6">
			<label class="text-left block mb-2 text-sm font-medium text-white" for="name">Name:</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="name"
				id="name"
				placeholder=""
				required
			/>
		</div>
		<div class="mb-6">
			<label class="text-left block mb-2 text-sm font-medium text-white" for="description"
				>Description:</label
			>
			<input
				class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
				type="text"
				name="description"
				id="description"
				placeholder=""
			/>
		</div>
		<button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			on:click={handleSubmission}>Create</button
		>
	</form>
	<a href="/dashboard" class="text-white">Go back</a>
</div>
