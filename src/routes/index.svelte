<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from "svelte";
	import numeral from "numeral";
	import Card from "$lib/Card.svelte";
	import LoadingIndicator from "$lib/LoadingIndicator.svelte";
	import { getNahmiiBalances } from "./../ethereum-calls";
	import { getNahmiiPriceUSD } from "./../thegraph-calls";

	let data = {};

	const updateStatistics = async () => {
		const { airdriipsRemaining, nahmiiL1, nahmiiL2, nahmiiAirdriip } =
			await getNahmiiBalances();
		const { nahmiiPrice } = await getNahmiiPriceUSD();

		data = {
			airdriipsRemaining,
			nahmiiL1: numeral(nahmiiL1).format("0.0a"),
			nahmiiL1Value: numeral(nahmiiL1 * nahmiiPrice).format("$0.00a"),
			nahmiiL2: numeral(nahmiiL2).format("0.0a"),
			nahmiiL2Value: numeral(nahmiiL2 * nahmiiPrice).format("$0.00a"),
			nahmiiAirdriip: numeral(nahmiiAirdriip).format("0a"),
			nahmiiAirdriipValue: numeral(nahmiiAirdriip * nahmiiPrice).format(
				"$0.00a"
			),
			hubiiFairValue: numeral(airdriipsRemaining * 15.7 * nahmiiPrice).format(
				"$0.00a"
			),
		};
		console.log(data);
	}

	onMount(async () => {
		updateStatistics();
		setTimeout(updateStatistics, 15*60*1000);
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if Object.keys(data).length > 0}
	<div class="list">
		<Card title="Nahmii in L1" value={`${data.nahmiiL1} NII`} />
		<Card title="Nahmii value in L1" value={data.nahmiiL1Value} />
		<Card title="Nahmii in L2" value={`${data.nahmiiL2} NII`} />
		<Card title="Nahmii value in L2" value={data.nahmiiL2Value} />
		<Card title="Airdriips remaining" value={data.airdriipsRemaining} />
		<Card title="Remaining nahmii airdriip" value={`${data.nahmiiAirdriip} NII`} />
		<Card title="Remaining airdriip value" value={data.nahmiiAirdriipValue} />
		<Card title="Hubii 'fair' value" value={data.hubiiFairValue} />
	</div>
{:else}
	<LoadingIndicator/>
{/if}

<section />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: auto;
		grid-gap: 1rem;
	}

	@media (min-width: 64rem) {
    .list {
			grid-template-columns: repeat(4, 1fr);
    }
	}
</style>
