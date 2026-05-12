<script>
	// @ts-nocheck

	import P5 from 'p5-svelte';

	//P5 CANVAS variables
	// @ts-ignore
	let cols, rows, current, previous;
	// @ts-ignore
	let offsetX, offsetY;
	// @ts-ignore
	let font;
	let dampening = 0.9;
	let cellSize = 8;
	// @ts-ignore
	let payoff;
	let phrase = 'IDBS'; //convert to props
	let payoffSize = 5;

	//p5 sketch
	// @ts-ignore
	const sketch = (p5) => {
		p5.setup = () => {
			p5.pixelDensity(2);
			// @ts-ignore
			p5.createCanvas(p5.windowWidth, p5.windowHeight);
			font = p5.textFont('Departure Mono');
			p5.noSmooth();

			cols = p5.floor(p5.width / cellSize);
			rows = p5.floor(p5.height / cellSize);
			offsetX = p5.floor((p5.width - cols * cellSize) / 2);
			offsetY = p5.floor((p5.height - rows * cellSize) / 2);

			//populate array
			// @ts-ignore
			// eslint-disable-next-line no-unused-vars
			current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
			// @ts-ignore
			// eslint-disable-next-line no-unused-vars
			previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
			// @ts-ignore
			payoff = new Array(cols).fill(false).map(() => new Array(rows).fill(false));

			buildPayoff();
		};

		function buildPayoff() {
			let pg = p5.createGraphics(p5.width, p5.height);
			pg.pixelDensity(1);
			pg.background(0);
			pg.fill(255);
			pg.noStroke();
			// @ts-ignore
			pg.textFont(font);
			pg.textSize(payoffSize * cellSize);
			// @ts-ignore
			pg.textAlign(p5.CENTER, p5.CENTER);
			pg.text(phrase, p5.width / 2, p5.height / 2);

			pg.loadPixels();
			// @ts-ignore
			for (let i = 0; i < cols; i++) {
				// @ts-ignore
				for (let j = 0; j < rows; j++) {
					// Usa l'offset nel campionamento
					// @ts-ignore
					let px = p5.floor(offsetX + i * cellSize + cellSize / 2);
					// @ts-ignore
					let py = p5.floor(offsetY + j * cellSize + cellSize / 2);
					let idx = (px + py * p5.width) * 4;
					// @ts-ignore
					payoff[i][j] = pg.pixels[idx] > 150;
				}
			}
		}

		p5.mouseDragged = () => {
			// @ts-ignore
			let ci = p5.floor((p5.mouseX - offsetX) / cellSize);
			// @ts-ignore
			let cj = p5.floor((p5.mouseY - offsetY) / cellSize);
			// @ts-ignore
			if (ci > 0 && ci < cols - 1 && cj > 0 && cj < rows - 1 && !payoff[ci][cj]) {
				// @ts-ignore
				previous[ci][cj] = 2500;
			}
		};

		p5.mousePressed = () => {
			// @ts-ignore
			let ci = p5.floor((p5.mouseX - offsetX) / cellSize);
			// @ts-ignore
			let cj = p5.floor((p5.mouseY - offsetY) / cellSize);
			// @ts-ignore
			if (ci > 0 && ci < cols - 1 && cj > 0 && cj < rows - 1 && !payoff[ci][cj]) {
				// @ts-ignore
				previous[ci][cj] = 2500;
			}
		};

		p5.draw = () => {
			p5.background(0);

			// --- Simulazione ripple ---
			// @ts-ignore
			for (let i = 1; i < cols - 1; i++) {
				// @ts-ignore
				for (let j = 1; j < rows - 1; j++) {
					// @ts-ignore
					if (payoff[i][j]) continue; // ostacolo: non si aggiorna, i ripple rimbalzano
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

			// --- Render griglia ---
			p5.noStroke();
			// @ts-ignore
			for (let i = 0; i < cols; i++) {
				// @ts-ignore
				for (let j = 0; j < rows; j++) {
					// @ts-ignore
					if (payoff[i][j]) continue; // lascia nero: il testo vero andrà sopra
					// @ts-ignore
					let c = p5.constrain(current[i][j], 0, 255);
					// @ts-ignore
					p5.fill(c);
					// @ts-ignore
					p5.rect(offsetX + i * cellSize, offsetY + j * cellSize, cellSize - 2, cellSize - 2);
				}
			}

			// @ts-ignore
			let temp = previous;
			// @ts-ignore
			previous = current;
			current = temp;

			p5.smooth();
			// @ts-ignore
			p5.textFont(font);
			p5.textSize(payoffSize * cellSize);
			// @ts-ignore
			p5.textAlign(p5.CENTER, p5.CENTER);
			p5.fill(255);
			p5.noStroke();
			// @ts-ignore
			p5.text(phrase, p5.width / 2, p5.height / 2);
			p5.noSmooth();
		};

		p5.windowResized = () => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
			cols = p5.floor(p5.width / cellSize);
			rows = p5.floor(p5.height / cellSize);
			offsetX = p5.floor((p5.width - cols * cellSize) / 2);
			offsetY = p5.floor((p5.height - rows * cellSize) / 2);
			// @ts-ignore
			current = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
			// @ts-ignore
			previous = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
			// @ts-ignore
			payoff = new Array(cols).fill(false).map(() => new Array(rows).fill(false));
			buildPayoff();
		};
	};
</script>

<P5 {sketch} />

<style>
	@font-face {
		font-family: 'Departure Mono';
		font-style: normal;
		font-weight: 400;
		src: url('/static/fonts/DepartureMono-Regular.woff2') format('woff2');
	}
</style>
