<script>
	import { browser } from '$app/environment';
	if (browser) {
		sessionStorage.removeItem('token');
		window.location.replace('/');
	}
</script>

<h1>Logging out...</h1>
