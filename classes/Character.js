class Character extends Thing {
	constructor(anims, items, x, y) {
		super();
		this.sprite = createSprite(x || width/2, y || height/2);
		for (var a in anims) {
			this.sprite.addAnimation(a, anims[a]);
		}
		this.items = [];
	}

	display() {
		this.sprite.display();
	}

	surfaceItem(label) {
		if (!this.items[label]) this.items[label] = new Item(true);
		else this.items[label].surfaced = true;
	}

	collectItem(item) {
		// this.items[label].surfaced = true; // if collected it is surfaced ... ?
		const items = Array.isArray(item) ? item : [item];
		items.forEach(label => {
			if (!this.items[label]) this.items[label] = new Item(true, true);
			else this.items[label].collected = true;
		});
	}

	removeItem(item) {
		this.items[item].collected = false;
	}

	hasSurfaced(label) {
		if (!this.items[label]) return false;
		if (Array.isArray(label)) {
			for (let i = 0; i < label.length; i++) {
				if (!this.items[label]) return false;
			}
			return label.every(l => l.surfaced);
		}
		return this.items[label].surfaced;
	}

	hasCollected(label) {
		if (Array.isArray(label)) {
			for (let i = 0; i < label.length; i++) {
				if (!this.items[label[i]]) return false;
			}
			return label.every(l => this.items[l].collected);
		}
		else if (!this.items[label]) return false;
		return this.items[label].collected;
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