class Splash extends Scene {

	setup() {
		this.hitEnter = false;
	}

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
			if (keyCode == ENTER) this.hitEnter = true;
		} else {
			if (this.hitEnter) {
				changeScene('marsii');
				this.hitEnter = false;
			}
		}

		
	}
}