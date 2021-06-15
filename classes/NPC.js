class NPC extends Scenery {
	constructor(x, y, spriteSheet, textColor, humanColor) {
		super(x, y, spriteSheet);
		this.dialogIndex = 0; // starting at 0, even is npc, odd is character
		this.nextIndex = 0;

		this.textColor = textColor;
		this.humanColor = humanColor;

		this.responses = [
			null,
			/* 1 */ " [1] Yes || [2] No ",
		];

		this.keysDown = {
			enter: false,
			a: false,
			b: false,
			c: false,
		};

		this.animations = {};
	}

	addAnimation(label, spriteSheet) {
		this.animations[label] = spriteSheet;
	}

	setup() {
		super.setup();
		for (const k in this.animations) {
			this.sprite.addAnimation(k, loadAnimation(this.animations[k]));
		}
	}

	displayDialog(character) {
		textSize(15);

		const dialog = this.dialog[this.dialogIndex];

		if (dialog.npc) {
			fill(this.textColor);
			text(dialog.npc, this.x, this.y - 100, 200, 200);
		}

		if (dialog.response) {
			fill(this.humanColor);
			let response = typeof dialog.response === 'number' ?
				this.responses[dialog.response] :
				dialog.response;
			text(response, character.x + 20, character.y - 20, 200, 300);
		} else if (typeof this.nextIndex === 'number' && !dialog.isEnd) {
			fill(255);
			text("hit enter", this.x, this.y + 50);
		}

		if (dialog.human) {
			fill(this.humanColor);
			text(dialog.human, character.x + 20, character.y - 20, 200, 300);
		}

		if (dialog.requirements && this.requirements) {
			for (let i = 0; i < this.requirements.length; i++) {
				const requirement = this.requirements[i];
				
				if (requirement.done) fill('green');
				else fill('red');

				text(requirement.needed, this.x, this.y + 15 - i * 25);
			}
		}

	}

	checkDialog(index, character) {
		const { needsCollected, needsSurfaced } = this.dialog[index];
		if (!needsCollected && !needsSurfaced) return true;
		if (needsSurfaced && character.hasSurfaced(needsSurfaced) && !character.hasCollected(needsSurfaced)) {
			return true;
		}
		if (needsCollected && character.hasCollected(needsCollected)) {
			return true;
		}
		return false;
	}

	getNextDialog(next, character) {
		if (Array.isArray(next)) {  // options
			let index = next.filter(i => this.checkDialog(i, character))[0];
			if (index) return index;
			return false;
		} else if (typeof next === 'number') {
			if (this.checkDialog(next, character)) return next;
			return false;
		} else {
			const index = this.dialogIndex + 1;
			if (index < this.dialog.length) {
				if (this.checkDialog(index, character)) return index;
			}
			return false;
		}
	}


	updateDialog(character) {
		const dialog = this.dialog[this.dialogIndex];
		this.nextIndex = this.getNextDialog(dialog.next, character); // for displaying enter

		// surface or collect items
		if (!dialog.read && dialog.item) {
			dialog.read = true;
			if (Array.isArray(dialog.item)) {
				dialog.item.forEach(item => {
					character.collectItem(item);		
				});
			} else {
				character.collectItem(dialog.item);
			}
		}

		if (!dialog.read && dialog.surface) {
			dialog.read = true;
			character.surfaceItem(dialog.surface);
		}

		if (!dialog.read && dialog.animation) {
			dialog.read = true;
			this.sprite.changeAnimation(dialog.animation);
		}

		// if they needed to collect an item to advance
		if (dialog.auto == this.nextIndex) {
			const index = this.getNextDialog(dialog.next, character);
			if (index) this.dialogIndex = index;
		}

		if (dialog.response && keyIsDown(49) && !this.keysDown.a) {
			// response with multiple options that could go to
			const index = this.getNextDialog(dialog.a, character);
			if (index) this.dialogIndex = index;
			else this.dialogIndex = dialog.default;

			this.keysDown.a = true;
			return;
		} else if (!keyIsDown(49)) {
			this.keysDown.a = false;
		}

		if (dialog.response && keyIsDown(50) && !this.keysDown.b) {
			this.dialogIndex = dialog.b;
			this.keysDown.b = true;
			return;
		} else if (!keyIsDown(50)) {
			this.keysDown.b = false;
		}

		if (dialog.response && keyIsDown(51) && !this.keysDown.c) {
			this.dialogIndex = dialog.c;
			this.keysDown.c = true;
			return;
		} else if (!keyIsDown(51)) {
			this.keysDown.c = false;
		}

		if (keyIsDown(ENTER) && !this.keysDown.enter) {
			if (!dialog.response && !dialog.isEnd) {
				if (this.nextIndex !== undefined) this.dialogIndex = this.nextIndex;
			}
			this.keysDown.enter = true;
		} else if (!keyIsDown(ENTER)) {
			this.keysDown.enter = false;
		}

	}
}