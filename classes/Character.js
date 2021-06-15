class Character extends Thing {
	constructor(anims, items, x, y) {
		super();
		this.sprite = createSprite(x || width/2, y || height/2);
		for (var a in anims) {
			this.sprite.addAnimation(a, anims[a]);
		}
		this.items = items;
	}

	display() {
		this.sprite.display();
	}

	surfaceItem(label) {
		this.items[label].surfaced = true;
	}

	collectItem(label) {
		// this.items[label].surfaced = true; // if collected it is surfaced ... ? 
		this.items[label].collected = true;
	}

	hasSurfaced(label) {
		return this.items[label].surfaced;
	}

	hasCollected(label) {
		return this.items[label].collected;
	}

	itemStatus(item, property) {
		return this.items[property];
	}

	update() {
		// user input - move character around
		var isWalkingR = false;
		var isWalkingL = false;
		var isWalkingU = false;
		var isWalkingD = false;

		//Moves character around
		if (keyIsDown(RIGHT_ARROW)) {
			this.speedX = 8;
			isWalkingR = true;
		} else if (keyIsDown(LEFT_ARROW)) {
		 	this.speedX = -8;
		 	isWalkingL = true;
		} else {
			this.speedX = 0;
		}

		if (keyIsDown(DOWN_ARROW)) {
			this.speedY = 8;
			isWalkingD = true;
		} else if (keyIsDown(UP_ARROW)) {
			this.speedY = -8;
			isWalkingU = true;
		} else {
			this.speedY = 0;
		}

		if (isWalkingR) {
			this.changeAnimation('walkright');
		} else if (isWalkingL) {
			this.changeAnimation('walkleft');
		} else if (isWalkingD) {
			this.changeAnimation('walkdown');
		} else if (isWalkingU) {
			this.changeAnimation('walkup');
		} else {
			this.changeAnimation('idle');
		}

		super.update();
	}

	changeAnimation(label) {
		this.sprite.changeAnimation(label);
	}
	
	remove() {
		this.sprite.remove();	
	}
}