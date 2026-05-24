<script>
	import { onMount, onDestroy } from 'svelte';
	import Logo from '../atoms/Logo.svelte';

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
		<Logo css="logo-img" />
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
		gap: var(--space-m-l) var(--space-xs-s); /* row-gap, column-gap */
		width: 100%;
		box-sizing: border-box;
		padding: var(--space-xl-2xl) var(--space-m-l) var(--space-m-l) var(--space-m-l);
		border-top: 1.5px solid var(--color);
		color: var(--color);
		background-color: transparent;
	}

	.cell {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.cell-logo {
		gap: var(--space-2xs-xs);
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
		gap: var(--space-4xs-3xs);
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs-3xs);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.credits {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs-3xs);
		margin: 0;
	}

	/* ------------------------------- */
	/* TABLET: Stadio Intermedio (12 Colonne) */
	/* ------------------------------- */
	@media (min-width: 768px) {
		footer {
			grid-template-columns: repeat(12, 1fr);
			column-gap: var(--space-xs-s);
			align-items: end;
			/* Resettiamo il padding per avere uno spazio uniforme */
			height: 100%;
			padding: var(--space-xs-s) var(--space-m-l);
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
			padding: var(--space-s-m) var(--space-s-m) var(--space-s-m);
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
			gap: var(--space-s-m);
		}

		/* Le info passano in orizzontale */
		.infoItem {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: flex-start;
			gap: var(--space-s-m);
		}

		/* I credits vanno su una riga sola */
		.credits {
			flex-direction: column;
			flex-wrap: wrap;
			gap: var(--space-4xs-3xs);
		}
	}
</style>
