<script>
	import { onMount } from "svelte";

	let mode; 
  $: modeIcon = mode === "dark" ? "☀️" : "🌙";
  
	function validMode(mode) {
    return mode = (mode === "light" || mode === "dark") ? true : false;
	}

  function toggleMode() {
    mode = mode == "light" ? "dark" : "light";
    localStorage.setItem("mode", mode);
    document.querySelector("html").dataset.mode = mode;
  }

	onMount(() => {
		const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const persistedMode = localStorage.getItem("mode");

		if (validMode(persistedMode)) {
			mode = persistedMode;
		} else {
			mode = darkMode ? "dark" : "light";
		}

		document.querySelector("html").dataset.mode = mode;
	});
</script>

<button on:click={toggleMode}>{modeIcon}</button>

<style>
	button {
		padding: 0.5em;
		width: 3em;
		height: 3em;
		border: 0;
		background-color: transparent;
		cursor: pointer;
	}
</style>