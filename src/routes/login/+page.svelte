<script>
	//@ts-nocheck
	let login = true;
	function handleSubmission() {
		// @ts-ignore
		const username = document.getElementById('username').value;
		// @ts-ignore
		const password = document.getElementById('password').value;

		fetch('https://api.cwute.dev/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
			.then((res) => res)
			.then((data) => {
				if (data.status == 200) {
					data.json().then((data) => {
						sessionStorage.setItem('token', data.token);
						window.location.replace('/dashboard');
					});
				}
				if (data.status == 401) {
					alert('Invalid credentials');
					login = false;
					setTimeout(() => {
						login = true;
					}, 3000);
				}
			});
	}
</script>

{#if login}
	<div class="text-center">
		<div class="pt-10 font-bold text-white">
			<h1 class="text-3xl">Welcome to login page</h1>
			<h2 class="text-1xl">Use the form below for login</h2>
		</div>
		<form class="pt-14 pr-14 pl-14 pb-7 sm:pl-96 sm:pr-96" onsubmit="return false">
			<div class="mb-6">
				<label for="username" class="text-left block mb-2 text-sm font-medium text-white"
					>Username</label
				>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="text"
					name="username"
					id="username"
					placeholder=""
					required
				/>
			</div>
			<div class="mb-6">
				<label for="password" class="text-left block mb-2 text-sm font-medium text-white"
					>Password</label
				>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="password"
					name="password"
					id="password"
					placeholder=""
					required
				/>
			</div>
			<div>
				<button
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					on:click={handleSubmission}>Login</button
				>
			</div>
		</form>
		<a href="/signup" class="text-white">Don't have an account?</a>
	</div>
{:else}
	<div
		class="tenor-gif-embed"
		data-postid="25174187"
		data-share-method="host"
		data-aspect-ratio="1.84971"
		data-width="100%"
	>
		<a href="https://tenor.com/view/genshin-impact-genshin-yae-yae-miko-smol-yae-gif-25174187"
			>Genshin Impact Genshin GIF</a
		>from <a href="https://tenor.com/search/genshin+impact-gifs">Genshin Impact GIFs</a>
	</div>
	<script type="text/javascript" async src="https://tenor.com/embed.js"></script>
{/if}
