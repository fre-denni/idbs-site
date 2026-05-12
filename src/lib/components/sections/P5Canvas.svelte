<script>
	/* eslint-disable no-unused-vars */
	import P5 from 'p5-svelte';

	//set up prop
	let { phrase = 'IDBS' } = $props();

	//component state
	let p5Instance = $state(null);
	let fontLoaded = $state(false);
	let fontFamily = 'Departure Mono';
	// @ts-ignore
	let cols, rows, current, previous, payoff;

	const cellSize = 8;
	const dampening = 0.9;
	const payoffSize = 5;

	$effect(() => {
		document.fonts.load(`2rem "${fontFamily}"`).then(() => {
			fontLoaded = true;
		});
	});

	// calculate grid
	$effect(() => {
		if (p5Instance && fontLoaded) {
			initializeGrids(p5Instance);
		}
	});

	// @ts-ignore
	function initializeGrids(p) {
		cols = p.floor(p.width / cellSize);
		rows = p.floor(p.height / cellSize);

		// Grid Initialization
		// @ts-ignore
		current = Array.from({ length: cols }, () => new Array(rows).fill(0));
		// @ts-ignore
		previous = Array.from({ length: cols }, () => new Array(rows).fill(0));
		// @ts-ignore
		payoff = Array.from({ length: cols }, () => new Array(rows).fill(false));

		// Calculate text "collision" mask
		let pg = p.createGraphics(p.width, p.height);
		pg.pixelDensity(1);
		pg.background(0);
		pg.fill(255);
		pg.textFont(fontFamily);
		pg.textSize(payoffSize * cellSize);
		pg.textAlign(p.CENTER, p.CENTER);
		pg.text(phrase, p.width / 2, p.height / 2);

		pg.loadPixels();
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				let px = p.floor(i * cellSize + cellSize / 2);
				let py = p.floor(j * cellSize + cellSize / 2);
				let idx = (px + py * pg.width) * 4;
				payoff[i][j] = pg.pixels[idx] > 128;
			}
		}
		try {
			pg.remove();
		} catch (e) {
			console.warn('p5 element cleanup skipped');
		}
	}

	// @ts-ignore
	const sketch = (p) => {
		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight);
			p.pixelDensity(2);
			setTimeout(() => {
				p5Instance = p;
			}, 0);
		};

		p.draw = () => {
			// @ts-ignore
			if (!payoff) return;
			p.background(0);

			// Ripple Math
			// @ts-ignore
			for (let i = 1; i < cols - 1; i++) {
				// @ts-ignore
				for (let j = 1; j < rows - 1; j++) {
					if (payoff[i][j]) continue;
					// @ts-ignore
					current[i][j] =
						// @ts-ignore
						(previous[i - 1][j] + previous[i + 1][j] + previous[i][j - 1] + previous[i][j + 1]) /
							2 -
						// @ts-ignore
						current[i][j];
					// @ts-ignore
					current[i][j] *= dampening;
				}
			}

			// Render Grid
			p.noStroke();
			// @ts-ignore
			for (let i = 0; i < cols; i++) {
				// @ts-ignore
				for (let j = 0; j < rows; j++) {
					if (payoff[i][j]) continue;
					// @ts-ignore
					let val = p.constrain(current[i][j], 0, 255);
					if (val > 2) {
						p.fill(val);
						p.rect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
					}
				}
			}

			// Swap buffers
			// @ts-ignore
			[previous, current] = [current, previous];

			// Draw sharp text on top
			p.fill(255);
			p.textFont(fontFamily);
			p.textSize(payoffSize * cellSize);
			p.textAlign(p.CENTER, p.CENTER);
			p.text(phrase, p.width / 2, p.height / 2);
		};

		p.mouseDragged = () => {
			let ci = p.floor(p.mouseX / cellSize);
			let cj = p.floor(p.mouseY / cellSize);
			// @ts-ignore
			if (previous[ci] && previous[ci][cj] !== undefined) {
				// @ts-ignore
				previous[ci][cj] = 1000;
			}
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			initializeGrids(p);
		};
	};
</script>

{#if fontLoaded}
	<div class="p5canvas">
		<P5 {sketch} />
	</div>
{/if}

<style>
	.p5canvas {
		position: fixed;
		inset: 0;
		background: black;
		z-index: -1;
	}
</style>
