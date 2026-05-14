<script>
	import { onMount, onDestroy } from 'svelte';
	import logo from '$lib/assets/logo.svg';

	// State variables
	let currentTime = $state('');
	let screenWidth = $state(0);
	let screenHeight = $state(0);
	let systemInfo = $state('');

	// let isOverCanvas = $state(false);

	// @ts-ignore
	let timeInterval;

	onMount(() => {
		// detect os
		systemInfo = detectDevice();

		// Set up clock
		const updateTime = () => {
			const now = new Date();
			const userLocale =
				typeof window !== 'undefined' && navigator.language ? navigator.language : 'it'; //city of Lecco buyah!

			// Formats time like "14:30:05" (adjust locales to your preference)
			currentTime = now.toLocaleTimeString(userLocale, {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});
		};

		updateTime(); // Call immediately so it doesn't wait 1 second to appear
		timeInterval = setInterval(updateTime, 1000);
	});

	onDestroy(() => {
		// Clean up the interval when the component unmounts
		// @ts-ignore
		if (timeInterval) clearInterval(timeInterval);
	});

	// Helper function to parse the user agent
	function detectDevice() {
		if (typeof window === 'undefined') return 'Unknown System'; // SSR fallback

		const ua = navigator.userAgent;
		let os = '';

		// Detect OS
		if (ua.includes('Win')) os = 'Windows';
		else if (ua.includes('Mac')) os = 'macOS';
		else if (ua.includes('Linux')) os = 'Linux';
		else if (ua.includes('Android')) os = 'Android';
		else if (ua.includes('like Mac')) os = 'iOS';

		return `${os}`;
	}
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<footer>
	<div class="cell cell-logo text-footer-regular">
		<div class="logo">
			<img src={logo} alt="Politecnico di Milano logo" />
			<p>
				2026.<span>IDBS</span><br />
				All Rights Reserved.
			</p>
		</div>
	</div>

	<div class="cell cell-info">
		<div class="infoItem text-footer-regular">
			<span>{systemInfo}</span>
			<span>{screenWidth} x {screenHeight}</span>
			<span>{currentTime}</span>
		</div>
	</div>

	<div class="cell cell-links">
		<ul class="links text-footer-regular">
			<li><a href="https://www.design.polimi.it/" target="_blank">School of Design</a></li>
			<li><a href="https://www.polimi.it/" target="_blank">Politecnico di Milano</a></li>
			<li><a href="https://www.comune.lecco.it/" target="_blank">City of Lecco</a></li>
		</ul>
	</div>

	<div class="cell cell-credits">
		<p class="credits text-footer-regular">
			<span>Designed by</span>
			<a href="https://www.federicodenni.com/" target="_blank">Federico Denni</a>
		</p>
	</div>
</footer>

<style>
	/* ------------------------------- */
	/* BASE / MOBILE: 2 columns x 3 rows */
	/* ------------------------------- */
	footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		/* Usiamo le aree per disegnare la griglia: i punti indicano celle vuote */
		grid-template-areas:
			'. .'
			'logo info'
			'links credits';
		gap: 18px 16px; /* row-gap, column-gap */
		width: 100%;
		box-sizing: border-box;
		left: 0;
		z-index: 50;
		background-color: transparent;
		padding: 2rem;
		border-top: 1.5px solid black;
		color: var(--color);
	}

	.cell {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	/* Assegniamo ogni cella alla sua area specifica */
	.cell-logo {
		grid-area: logo;
	}

	.cell-info {
		grid-area: info;
	}

	.cell-links {
		grid-area: links;
	}

	.cell-credits {
		grid-area: credits;
	}

	.logo {
		display: flex;
		width: fit-content;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.625rem;
		align-self: stretch;
	}

	.logo img {
		height: 100%;
		width: 8rem;
		align-self: flex-start;
		color: var(--color);
	}

	.logo p {
		margin: 0;
	}

	.logo p span {
		font-family: var(--mono);
	}

	.infoItem {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.links a,
	.credits a {
		color: var(--color);
	}

	.credits {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin: 0;
	}

	/* ------------------------------- */
	/* DESKTOP            */
	/* ------------------------------- */
	@media (min-width: 800px) {
		footer {
			grid-template-areas: none; /* Rimuoviamo le aree sul desktop */
			grid-template-columns: repeat(12, 1fr);
			grid-template-rows: auto;
			gap: 0;
			padding: 2rem;
			column-gap: 1rem;
			align-items: end;
		}

		.cell-logo {
			grid-area: auto; /* Resettiamo l'area assegnata nel mobile */
			grid-column: span 3;
		}

		.cell-info {
			grid-area: auto;
			grid-column: span 5;
		}

		.infoItem {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: flex-start;
			gap: 1rem;
		}

		.cell-links {
			grid-area: auto;
			grid-column: span 2;
		}

		.cell-credits {
			grid-area: auto;
			grid-column: span 2;
			flex-direction: row;
			justify-content: flex-start;
			gap: 0.3rem;
		}

		.logo {
			flex-direction: row;
			align-items: flex-start;
			gap: 1.5rem;
		}
	}
</style>
