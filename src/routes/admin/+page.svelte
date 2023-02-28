<script>
	//@ts-nocheck
	import { browser } from '$app/environment';
	import Navbar from '../../Components/Navbar.svelte';
	let isAdmin = false;
	let generatedInvite = false;
	let generatedCode = '';
	let inviteCodes = new Array();

	if (browser) {
		if (sessionStorage.getItem('token') == null) {
			window.location.replace('/login');
		}
		fetchAllCodes();
	}

	function fetchAllCodes() {
		fetch('https://api.cwute.dev/admin/get-invite-codes', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res)
			.then((data) => {
				if (data.status == 401) {
					window.location.replace('/login');
				}
				if (data.status == 200) {
					data.json().then((data) => {
						inviteCodes = data;
						isAdmin = true;
					});
				}
			});
	}

	function generateInviteCode() {
		fetch('https://api.cwute.dev/admin/generate-invite-code', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res)
			.then((data) => {
				data.body
					.getReader()
					.read()
					.then((data) => {
						generatedCode = new TextDecoder('utf-8').decode(data.value);
						navigator.clipboard.writeText(generatedCode);
						generatedInvite = true;
						fetchAllCodes();
					});
			});
	}

	function copyCode(code) {
		navigator.clipboard.writeText(code);
		alert('copied to clipboard');
	}
</script>

{#if isAdmin}
	<Navbar />
	<div class="text-center p-10">
		<div><h1>Invite Codes</h1>
			<div class="bg-gray-800 rounded overflow-auto p-5 h-[620px]">
				
				{#each inviteCodes as inviteCode}
					<div class="bg-gray-700 border mb-5 rounded p-0 m-0 col-span-1">
						<h1>Code: {inviteCode.code}</h1>
						<h1>Used: {inviteCode.used}</h1>
						<button on:click={copyCode(inviteCode.code)}>Copy code</button>
					</div>
				{/each}
			</div>
			<button on:click={generateInviteCode}>Generate Invite Code</button>
			{#if generatedInvite}
				<div>
					<h1>{generatedCode}</h1>
					<h3>copied to clipboard</h3>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<h1 class="text-white text-center text-3xl">
		Trying to find the will to live... I mean loading...
	</h1>
{/if}
