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
	<div class="cell cell-logo">
		<div class="logo">
			<img src={logo} alt="Politecnico di Milano logo" />
			<p>
				2026.<span>IDBS</span><br />
				All Rights Reserved.
			</p>
		</div>
	</div>

	<div class="cell cell-info">
		<div class="infoItem">
			<span>{systemInfo}</span>
			<span>{screenWidth} x {screenHeight}</span>
			<span>{currentTime}</span>
		</div>
	</div>

	<div class="cell cell-links">
		<ul class="links">
			<li><a href="https://www.design.polimi.it/" target="_blank">School of Design</a></li>
			<li><a href="https://www.polimi.it/" target="_blank">Politecnico di Milano</a></li>
			<li><a href="https://www.comune.lecco.it/" target="_blank">City of Lecco</a></li>
		</ul>
	</div>

	<div class="cell cell-credits">
		<p class="credits">
			<span>Designed by</span>
			<a href="https://www.federicodenni.com/" target="_blank">Federico Denni</a>
		</p>
	</div>
</footer>

<style>
	/* ------------------------------- */
	/* BASE / MOBILE: 2 columns x 2 rows */
	/* ------------------------------- */
	footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 22px 16px; /* row-gap, column-gap */
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 50;
		mix-blend-mode: difference;
		background-color: transparent;

		font-size: 0.8125rem;
		padding: 1.5rem 2rem;
		border-top: 1.5px solid black;
		font-family: var(--sans);
		color: white;
	}

	.cell {
		display: flex;
		flex-direction: column;
		justify-content: flex-end; /* Bottom aligns everything in the cell */
	}

	.logo {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.logo img {
		width: 6.5rem;
	}

	.logo p {
		margin: 0;
		font-size: 0.8125rem;
		line-height: 1.2;
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
		color: white;
	}

	.credits {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin: 0;
	}

	/* ------------------------------- */
	/* DESKTOP: 6 Column Strict Grid   */
	/* ------------------------------- */
	@media (min-width: 768px) {
		footer {
			/* Creates 6 perfectly equal columns */
			grid-template-columns: repeat(6, 1fr);
			gap: 1rem 16px;
			align-items: end; /* Aligns all content to the bottom of the footer */
		}

		/* We assign the 4 cells across the 6 columns (2 + 2 + 1 + 1 = 6) */
		.cell-logo {
			grid-column: span 2;
		}
		.cell-info {
			grid-column: span 2;
		}
		.cell-links {
			grid-column: span 1;
		}

		.cell-credits {
			flex-direction: row;
			justify-content: flex-end;
			gap: 0.3rem;
		}

		/* Optional: Make the logo and text sit side-by-side on desktop */
		.logo {
			flex-direction: row;
			align-items: flex-end;
			gap: 1.5rem;
		}
	}
</style>
