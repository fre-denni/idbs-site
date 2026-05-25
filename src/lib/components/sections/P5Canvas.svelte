<script>
	import P5 from 'p5-svelte';

	let { phrase } = $props();

	let p5Instance = $state(null);
	let fontLoaded = $state(false);
	let fontFamily = 'Departure Mono';
	// @ts-ignore
	let cols, rows, current, previous, payoff;

	const cellSize = 8;
	const dampening = 0.9;
	const payoffSize = 5;

	// Cache sicura dei colori per evitare garbage collection
	const colorCache = Array.from({ length: 256 }, (_, i) => `rgb(${i},${i},${i})`);

	$effect(() => {
		document.fonts.load(`2rem "${fontFamily}"`).then(() => {
			fontLoaded = true;
		});
	});

	$effect(() => {
		if (p5Instance && fontLoaded) {
			initializeGrids(p5Instance);
		}
	});

	// @ts-ignore
	function initializeGrids(p) {
		// SISTEMA DI SICUREZZA: Limitiamo le celle massime.
		// Evita che su schermi 4k il doppio ciclo for blocchi la CPU.
		const maxCells = 250;
		cols = Math.min(p.floor(p.width / cellSize), maxCells);
		rows = Math.min(p.floor(p.height / cellSize), maxCells);

		// @ts-ignore
		current = Array.from({ length: cols }, () => new Array(rows).fill(0));
		// @ts-ignore
		previous = Array.from({ length: cols }, () => new Array(rows).fill(0));
		// @ts-ignore
		payoff = Array.from({ length: cols }, () => new Array(rows).fill(false));

		// Canvas temporaneo piccolissimo solo per mappare la collisione
		const collisionCanvas = document.createElement('canvas');
		collisionCanvas.width = cols * cellSize;
		collisionCanvas.height = rows * cellSize;
		const ctx = collisionCanvas.getContext('2d', { willReadFrequently: true });

		// @ts-ignore
		ctx.fillStyle = 'black';
		// @ts-ignore
		ctx.fillRect(0, 0, collisionCanvas.width, collisionCanvas.height);
		// @ts-ignore
		ctx.font = `${payoffSize * cellSize}px "${fontFamily}"`;
		// @ts-ignore
		ctx.fillStyle = 'white';
		// @ts-ignore
		ctx.textAlign = 'center';
		// @ts-ignore
		ctx.textBaseline = 'middle';
		// @ts-ignore
		ctx.fillText(phrase, collisionCanvas.width / 2, collisionCanvas.height / 2);

		// @ts-ignore
		const pixels = ctx.getImageData(0, 0, collisionCanvas.width, collisionCanvas.height).data;

		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				let px = p.floor(i * cellSize + cellSize / 2);
				let py = p.floor(j * cellSize + cellSize / 2);
				let idx = (px + py * collisionCanvas.width) * 4;
				payoff[i][j] = pixels[idx] > 128;
			}
		}
	}

	// @ts-ignore
	const sketch = (p) => {
		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.pixelDensity(1); // Manteniamo a 1 per salvare la CPU
			p.frameRate(45); // Limitiamo leggermente il framerate per stabilità
			setTimeout(() => {
				p5Instance = p;
			}, 0);
		};

		p.draw = () => {
			// @ts-ignore
			if (!payoff) return;

			const ctx = p.drawingContext;
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, p.width, p.height);

			// Math
			// @ts-ignore
			for (let i = 1; i < cols - 1; i++) {
				// @ts-ignore
				for (let j = 1; j < rows - 1; j++) {
					if (payoff[i][j]) {
						// @ts-ignore
						current[i][j] = 0;
						continue;
					}
					// @ts-ignore
					current[i][j] =
						// @ts-ignore
						(previous[i - 1][j] + previous[i + 1][j] + previous[i][j - 1] + previous[i][j + 1]) /
							2 -
						// @ts-ignore
						current[i][j];
					// @ts-ignore
					current[i][j] *= dampening;
					// @ts-ignore
					if (Math.abs(current[i][j]) < 0.5) current[i][j] = 0;
				}
			}

			// Render
			// @ts-ignore
			for (let i = 0; i < cols; i++) {
				// @ts-ignore
				for (let j = 0; j < rows; j++) {
					if (payoff[i][j]) continue;
					// @ts-ignore
					let val = current[i][j];
					if (val > 2) {
						val = val > 255 ? 255 : Math.floor(val);
						ctx.fillStyle = colorCache[val];
						// Rimossa la sottrazione di 1 pixel (cellSize - 1) per alleggerire il calcolo dei bordi
						ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
					}
				}
			}

			// @ts-ignore
			[previous, current] = [current, previous];
		};

		p.mouseDragged = () => {
			let ci = p.floor(p.mouseX / cellSize);
			let cj = p.floor(p.mouseY / cellSize);
			// @ts-ignore
			if (ci > 0 && ci < cols - 1 && cj > 0 && cj < rows - 1) {
				// @ts-ignore
				if (!payoff[ci][cj]) previous[ci][cj] = 500; // Abbassata l'energia per evitare overflow visivi
			}
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			if (p5Instance && fontLoaded) initializeGrids(p);
		};
	};
</script>

{#if fontLoaded}
	<div class="wrapper">
		<div class="p5canvas">
			<P5 {sketch} />
		</div>

		<div
			class="dom-text"
			style="font-family: '{fontFamily}'; font-size: {payoffSize * cellSize}px;"
		>
			{phrase}
		</div>
	</div>
{/if}

<style>
	.wrapper {
		position: fixed;
		inset: 0;
		background: black;
		z-index: -1;
	}

	.p5canvas {
		position: absolute;
		inset: 0;
	}

	.dom-text {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--bg, #fff);
		pointer-events: none;
		user-select: none;
		background-color: transparent;
	}
</style>
