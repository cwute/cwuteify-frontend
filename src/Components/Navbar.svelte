<script>
	//@ts-nocheck
	import { onMount } from 'svelte';

	let isAdmin = false;
	let navOpen = false;

	onMount(() => {
		fetch('/api/username', {
			method: 'POST',
			body: JSON.stringify({ token: sessionStorage.getItem('token') })
		})
			.then((res) => res.json())
			.then((data) => {
				isAdmin = data.isAdmin;
			});

		document.querySelector('[data-collapse-toggle]').addEventListener('click', () => {
			const nav = document.querySelector('#navbar-hamburger');
			nav.classList.toggle('hidden');
			navOpen = !navOpen;
		});
	});
</script>

<nav
	class="pt-3 pb-3 mb-6 pr-0 mr-0 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
>
	<div class=" flex flex-wrap items-center justify-between mx-auto">
		<a href="/" class="flex items-start">
			<img src="icon.jpg" class="h-6 mr-3 sm:h-10 rounded-full" alt="cwute logo" />
			<span class="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white"
				>cwuteify.</span
			>
		</a>
		<button
			data-collapse-toggle="navbar-hamburger"
			type="button"
			class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-hamburger"
			aria-expanded="false"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
		<div class="hidden w-full" id="navbar-hamburger">
			<ul class="flex flex-col mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
				<li>
					<a
						href="/dashboard"
						class="block py-2 pl-3 pr-4 dark:text-white text-black ligh rounded hover:bg-gray-100 dark:hover:bg-gray-900"
						aria-current="page">Dashboard</a
					>
				</li>

				<li>
					<a
						href="/create-playlist"
						class="block py-2 pl-3 pr-4 dark:text-white text-black rounded hover:bg-gray-100 dark:hover:bg-gray-900"
						>Create playlist</a
					>
				</li>
				{#if isAdmin}
					<li>
						<a
							href="/admin"
							class="block py-2 pl-3 pr-4 dark:text-white text-black rounded hover:bg-gray-100 dark:hover:bg-gray-900"
							>Admin</a
						>
					</li>

					<li>
						<a
							href="/create-song"
							class="block py-2 pl-3 pr-4 dark:text-white text-black rounded hover:bg-gray-100 dark:hover:bg-gray-900"
							>Create song</a
						>
					</li>
				{/if}
				<li>
					<a
						href="/logout"
						class="block py-2 pl-3 pr-4 dark:text-white text-black rounded hover:bg-gray-100 dark:hover:bg-gray-900"
						>Logout</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
