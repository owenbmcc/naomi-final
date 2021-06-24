/*
	added properties to the npcs, managed in invididual classes in NPCs/ directory
	properties

	most of the data is contained by NPCs and passed to character, items that are surfaced and collected

	textColor -- color of npc dialog/text
	humanColor -- color for human dialog/text
	npc -- text displayed by npc
	human -- text displayed by human
	next -- next dialog index to load -- leaving out will try to load dialogIndex + 1
	response -- if human requires response -- num is for default repsonses, string for custom response
	a -- response option 1 - num goes to next dialog, array tries each option
	b -- reponse option 2
	default -- if neither a or b are available
	item -- string or list -- character collects item 
	needsSurfaced -- character needs item surfaced to get dialog
	needsCollected -- character needs item collected
	auto -- automatically load dialog if the parameters are met
	isEnd -- end of dialog tree

*/

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
		// calculate the next dialog to start instead of doing it a bunch of time
		// also to display "hit enter" or not
		this.nextIndex = this.getNextDialog(dialog.next, character);

		// surface or collect items -- read set to prevent multiple events
		if (!dialog.read) {
			dialog.read = true;
			if (dialog.item) character.collectItem(dialog.item);
			if (dialog.remove) character.removeItem(dialog.remove);
			if (dialog.surface) character.surfaceItem(dialog.surface);
			if (dialog.animation) this.sprite.changeAnimation(dialog.animation);
		}

		// if they needed to collect an item to advance
		if (Array.isArray(dialog.auto)) { // -- yikes
			const index = this.getNextDialog(dialog.auto, character);
			if (index) this.dialogIndex = index;
		}

		if (dialog.auto) {
			const index = this.getNextDialog(dialog.auto, character);
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
			if (!dialog.response && !dialog.isEnd && typeof this.nextIndex === 'number') {
				if (this.nextIndex !== undefined) this.dialogIndex = this.nextIndex;
			}
			this.keysDown.enter = true;
		} else if (!keyIsDown(ENTER)) {
			this.keysDown.enter = false;
		}
	}
}