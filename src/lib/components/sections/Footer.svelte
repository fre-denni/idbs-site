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
		<img src={logo} alt="Politecnico di Milano logo" class="logo-img" />
		<p class="logo-text">
			2026.<span>IDBS</span><br />
			All Rights Reserved.
		</p>
	</div>

	<div class="cell cell-info text-footer-regular">
		<div class="infoItem">
			<span>{systemInfo}</span>
			<span>{screenWidth} x {screenHeight}</span>
			<span>{currentTime}</span>
		</div>
	</div>

	<div class="cell cell-links text-footer-regular">
		<ul class="links">
			<li><a href="https://www.design.polimi.it/" target="_blank">School of Design</a></li>
			<li><a href="https://www.polimi.it/" target="_blank">Politecnico di Milano</a></li>
			<li><a href="https://www.comune.lecco.it/" target="_blank">City of Lecco</a></li>
		</ul>
	</div>

	<div class="cell cell-credits text-footer-regular">
		<p class="credits">
			<span>Designed by</span>
			<a href="https://www.federicodenni.com/" target="_blank">Federico Denni</a>
		</p>
	</div>
</footer>

<style>
	/* ------------------------------- */
	/* BASE / MOBILE: Griglia 2 Colonne */
	/* ------------------------------- */

	footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem 1rem; /* row-gap, column-gap */
		width: 100%;
		box-sizing: border-box;
		/* Invece di una riga vuota, usiamo un padding-top abbondante (es. 6rem o 8rem) */
		padding: 4rem 2rem 2rem 2rem;
		border-top: 1.5px solid black;
		color: var(--color);
		background-color: transparent;
	}

	/* Impostazioni base per tutte le celle (stile Space10: ancorate in basso) */
	.cell {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	/* Layout interno degli elementi (Verticale di default) */
	.cell-logo {
		gap: 0.625rem;
	}

	.logo-img {
		height: auto;
		width: 8rem;
		color: var(--color, #000);
	}

	.logo-text {
		margin: 0;
	}

	.logo-text span {
		font-family: var(--mono, monospace);
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

	.credits {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin: 0;
	}

	/* ------------------------------- */
	/* TABLET: Stadio Intermedio (12 Colonne) */
	/* ------------------------------- */
	@media (min-width: 768px) {
		footer {
			grid-template-columns: repeat(12, 1fr);
			column-gap: 1rem;
			align-items: end;
			/* Resettiamo il padding per avere uno spazio uniforme */
			height: 100%;
			padding: 1rem 2rem;
		}

		.cell-logo {
			grid-column: span 4;
		}
		.cell-info {
			grid-column: span 4;
		}
		.cell-links {
			grid-column: span 2;
		}
		.cell-credits {
			grid-column: span 2;
		}
	}

	/* ------------------------------- */
	/* DESKTOP: Layout Esteso */
	/* ------------------------------- */
	@media (min-width: 1024px) {
		footer {
			padding: 1.5rem 1.5rem 1.5rem;
		}
		/* Ribilanciamo gli spazi per schermi larghi */
		.cell-logo {
			grid-column: span 3;
			justify-content: flex-start;
		}
		.cell-info {
			grid-column: span 5;
		}

		.cell-logo {
			flex-direction: row;
			align-items: flex-end;
			gap: 1.5rem;
		}

		/* Le info passano in orizzontale */
		.infoItem {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: flex-start;
			gap: 1rem;
		}

		/* I credits vanno su una riga sola */
		.credits {
			flex-direction: column;
			flex-wrap: wrap;
			gap: 0.3rem;
		}
	}
</style>
