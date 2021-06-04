class Splash extends Scene {
	draw() {
		background(0);
		textSize(60);
		noFill();
		textAlign(CENTER, CENTER);
		strokeWeight(2);
		stroke('pink')

		textSize(50);

		text('press enter to start', width/2, 200);

		if (keyIsPressed) {
			if (keyCode == ENTER) changeScene('marsii');
		}
	}
}