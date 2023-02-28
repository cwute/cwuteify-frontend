<script>
	// @ts-nocheck

	let samePass = true;
	let processedSignup = false;
	let error = false;
	let errorMessage = '';
	function processForm() {
		const username = document.getElementById('username').value;
		const email = document.getElementById('email').value;
		const password1 = document.getElementById('password1').value;
		const password2 = document.getElementById('password2').value;
		const invite = document.getElementById('invite').value;

		if (isEmptyOrSpaces(username) || isEmptyOrSpaces(email) || isEmptyOrSpaces(password1) || isEmptyOrSpaces(password2)) {
			samePass = false;
			errorMessage = 'Please fill out all fields';
			return;
		}

		if (password1 != password2) {
			samePass = false;
		} else {
			samePass = true;
		}

		if (samePass) {
			const user = { username: username, email: email, password: password1, inviteCode: invite };
			fetch('https://api.cwute.dev/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			})
				.then((res) => res)
				.then((data) => {
					data.text().then((text) => {
						console.log(text);
						errorMessage = text;
					});
					if (data.status == 200) {
						processedSignup = true;
						error = false;
						loginUser(user.username, user.password);
					} else {
						error = true;
					}
				});
		}
	}

	function isEmptyOrSpaces(str) {
		return str === null || str.match(/^ *$/) !== null;
	}

	function loginUser(username, password) {
		fetch('https://api.cwute.dev/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
			.then((res) => res.json())
			.then((data) => {
				sessionStorage.setItem('token', data.token);
				window.location.replace('/dashboard');
			});
	}
</script>

{#if !processedSignup}
	<div class="text-center">
		<div class="text-white font-bold pl-10 pr-10 pt-10">
			<h1 class="text-3xl ">Sign up</h1>
			<h2 class="text-1xl">Please register if you have received an invitation code.</h2>
		</div>
		<form
			class="text-center pt-14 pr-14 pl-14 pb-7 sm:pl-96 sm:pr-96"
			onsubmit="return false;"
			id="form"
		>
			{#if !samePass}
				<h3 class=" text-white text-left">Passwords do not match</h3>
			{/if}
			{#if error}
				<h3 class="text-white">{errorMessage}</h3>
			{/if}
			<div class="mb-6">
				<label class="text-left block mb-2 text-sm font-medium text-white" for="username"
					>Username</label
				>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="text"
					placeholder=""
					id="username"
					required
				/>
			</div>
			<div class="mb-6">
				<label class="text-left block mb-2 text-sm font-medium text-white" for="email">Email</label>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="email"
					placeholder=""
					id="email"
					required
				/>
			</div>
			<div class="mb-6">
				<label class="text-left block mb-2 text-sm font-medium text-white" for="password1"
					>Password</label
				>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="password"
					placeholder=""
					id="password1"
					required
				/>
			</div>
			<div class="mb-6">
				<label class="text-left block mb-2 text-sm font-medium text-white" for="password2"
					>Repeat password</label
				>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="password"
					placeholder=""
					id="password2"
					required
				/>
			</div>
			<div class="mb-6">
				<label class="text-left block mb-2 text-sm font-medium text-white" for="invite"
					>Invite code</label
				>
				<input
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="text"
					placeholder=""
					id="invite"
				/>
			</div>
			<input
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="submit"
				on:click={processForm}
				value="Register now"
			/>
		</form>
		<a href="/login" class="text-white">Already have an account?</a>
	</div>
{:else}
	<h1 class="pt-14 text-3xl text-white">
		Registration successful. You will be redirected in a moment...
	</h1>
{/if}
