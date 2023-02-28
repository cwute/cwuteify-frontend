<script>
	function goToLogin() {
		window.location.href = '/login';
	}

	function goToSignup() {
		window.location.href = '/signup';
	}
</script>

<h1 class="text-white text-4xl text-center pt-10 font-bold">cwuteify.</h1>
<h3 class="text-center text-3xl font-semibold leading-normal text-gray-900 dark:text-white">
	Next gen spoify rip off.
</h3>
<div class="flex flex-col pt-10 gap-10">
	<div class="pl-5 h-min pr-5 flex justify-center gap-5">
		<button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-min px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			on:click={goToLogin}>Login</button
		>
		<button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-min px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			on:click={goToSignup}>Sign up</button
		>
	</div>
	<div class="ml-8 mr-8 p-5 flex-col bg-gray-800 rounded-lg ">
		<h1 class="text-2xl text-left font-bold underline">About this project</h1>
		<p>
			cwuteify is an open source music streaming service. This project was developed as part of my
			networking class. It's nowhere near spoify, but it was a fun learning project for me to get
			more familiar with Spring and Frontend. Even though I'm not a big fan of frontend, learning
			Svelte was overall a fun experience, because it was pretty straightforward and easy to learn.
			If you'd like to have a look at the source code, you can find it on <a
				class="underline hover:text-blue-400"
				href="https://github.com/cwute/cwuteify-backend">Backend repo</a
			>
			and
			<a class="underline hover:text-blue-400" href="https://github.com/cwute/cwuteify-frontend"
				>Frontend repo</a
			>.
		</p>
	</div>
	<div class="ml-8 mr-8 p-5 flex-col bg-gray-800 rounded-lg ">
		<h1 class="text-2xl text-left font-bold underline">
			Very clean design (it is everything but clean)
		</h1>
		<div class="flex ml-0 mr-0 mt-1 flex-col sm:flex-row sm:justify-between sm:gap-0 gap-2">
			<img
				class="bg-gray-700 p-5 h-96 w-96 sm:h-[400px] sm:w-[450px] rounded-lg"
				src="dashboard.png"
				alt="dashboard showcase"
			/>
			<img
				class="bg-gray-700 p-5 h-96 w-96 sm:h-[400px] sm:w-[450px] rounded-lg"
				src="create-song.png"
				alt="create song showcase"
			/>
			<img
				class="bg-gray-700 p-5 h-96 w-96 sm:h-[400px] sm:w-[450px] rounded-lg"
				src="signup.png"
				alt=""
			/>
		</div>
	</div>
	<div class="ml-8 mr-8 p-5 flex-col bg-gray-800 rounded-lg ">
		<h1 class="text-2xl text-left font-bold underline">
			Thank you part <span class="text-red-500">❤</span>
		</h1>
		<p>
			<span class="font-bold"
				>Yeah... so like long story short, I'd like to thank some of my teachers.</span
			><br /><br />
			First of all, I'd like to thank my Computer Systems and Networks teacher. I consulted this project
			with him a bit and after I submitted the backend part, he was quite enthusiastic about it and told
			me that he'd like to see the frontend part as well. And that gave me the final push forward to
			finish it, because seeing his honest enthusiasm was just a really cool feeling.<br /><br />
			Secondly I'd like to thank my current web development teacher. When I showed him a simple test
			page I made just as an example for consuming the API, he showed a great interest and enthusiasm,
			and that gave me the motivation to show him the final thing as well.<br /><br />
			Last but not least, I'd like to thank my web development teacher from last year. Even though I
			felt like I had learnt nothing at the end of the second year, when I started developing the frontend
			part of this, I realised how much I had actually learnt from her. I was super happy when I realised
			that I actually knew all the necessary stuff about html, css and web development in general.<br
			/><br />
			Honourable mention goes to my former Java teachers. Since one of them tried to click progress bar,
			and that motivated me to implement a clickable progress bar, and together over the course of two
			years they taught me Java pretty well.<br /><br />
			I'm not going to name any of them, but they most likely know who they are.<br /> <br />
			<span class="font-bold"
				>Wondering why? Because I feel that most of the teachers are not being praised enough for
				everything they do, and this is just my way of trying to show them my gratitude and
				respect towards them.</span
			>
		</p>
	</div>
	<div class="ml-8 mr-8 p-5 flex-col bg-gray-800 rounded-lg ">
		<h1 class="text-2xl text-left font-bold underline">About me</h1>
		<p>
			If you want to get in touch, you can reach out to me on Discord: Liko#5507 or <a
				class="underline hover:text-blue-400"
				href="https://www.linkedin.com/in/tom%C3%A1%C5%A1-marti%C5%A1ka-263959206/">LinkedIn</a
			> (Linked my LinkedIn so you can send me those Amazon and Google job offers.) Well, that's all
			for now, have fun trying out this app and try to not to die from cringe as you browse through the
			code.
		</p>
	</div>
	<div class="ml-8 mr-8 p-5 flex-col bg-gray-800 rounded-lg ">
		<h1 class="text-2xl text-left font-bold underline">Tech stack</h1>
		<ul class="pl-5 list-disc">
			<li>Spring</li>
			<li>PostgreSQL</li>
			<li>Java</li>
			<li>Svelte</li>
		</ul>
	</div>
</div>

<footer
	class="p-4 mt-10 text-centerrounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800"
>
	<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
		>&copy; 2023 made with <span class="text-red-500">❤</span> by
		<a href="https://liko.xyz" class="text-blue-500 hover:underline">Liko</a>
	</span>
</footer>
