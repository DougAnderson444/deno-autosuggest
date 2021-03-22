<script>
	import { LucidSuggest } from "lucid-suggest/en";
	import ListItem from "./ListItem.svelte";
	import DATA from "./schema.json";
	import IconLoupe from "./IconLoupe.svelte";
	import Legend from "./Legend.svelte";

	const limit = 15;

	const suggest = new LucidSuggest();
	suggest.setLimit(limit);
	// suggest.addRecords(DATA);

	setUp(DATA);

	function setUp(data) {
		const rating = 0;
		let id = 0;
		const start = Date.now();
		for (const record of data) {
			let title = record["@id"]
				.split(":")[1]
				// insert a space before capitalized words (but not acronyms)
				.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, " $1")
				// uppercase the first character
				.replace(/^./, (s) => s.toUpperCase());

			for (const property in record) {
				if (
					(typeof record[property] === "string" ||
						record[property] instanceof String) &&
					property !== "@id" && // we already included id above
					property !== "@type" && // we are not including type
					!property.includes("label") // label is the same as the parsed @id
				) {
					title += ` ${record[property]} `; // concat it to the rest
				}
			}
			suggest.addRecords([{ ...record, id, title, rating }]);
			id++;
		}
		const ttc = Date.now() - start;
		console.log("Time to complete: ", ttc);
	}

	let input, hits;

	$: input &&
	input.replace(/[`~!@#$%^&*()|+=?;:'",.<>\{\}\[\]\\\/]/gi, "").toLowerCase()
		? (hits = suggest.search(input))
		: null;
</script>

<main>
	<h1>LucidSuggest demo</h1>
	<br />
	<form>
		<div class="input-group mb-3">
			<input
				bind:value={input}
				class="form-control"
				type="text"
				placeholder="Search"
			/>
			<div class="input-group-append">
				<span class="input-group-text" id="basic-addon2">
					<IconLoupe />
				</span>
			</div>
		</div>
	</form>
	{#if hits}
		{#await hits then hits}
			<div class="alert alert-success" role="alert">
				Showing {hits.length < limit ? "" : "the first"}
				<strong>{hits.length}</strong> results.
			</div>
			<div>
				<Legend />
			</div>
		{/await}
	{/if}
	<ul class="list-group" id="search-results">
		{#if hits}
			{#await hits then hits}
				{#each hits as hit}
					<ListItem {hit} bind:input />
				{/each}
			{/await}
		{/if}
	</ul>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		max-width: 320px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 481px) {
		main {
			max-width: none;
		}
	}
</style>
