class NPC extends Scenery {
	constructor(x, y, spriteSheet, textColor, humanColor) {
		super(x, y, spriteSheet);
		this.dialogCount = 0; // starting at 0, even is npc, odd is character

		this.textColor = textColor;
		this.humanColor = humanColor;

		this.reponseType = {
			ab: " [1] Yes || [2] No ",
		}

		this.keysDown = {
			enter: false,
			a: false,
			b: false,
		};
	}
	
	displayDialog(character) {
		textSize(15);
		// if (this.dialogCount % 1 == .5) {
		// 	fill(this.humanColor);
		// 	text(this.choiceString, character.x, character.y - 20, 200, 200);
		// } else {
		// 	fill(this.textColor);
		// }

		const dialog = this.dialog[this.dialogCount];
		// console.log(dialog, this.dialogCount);
		if (dialog.npc) {
			fill(this.textColor);
			text(dialog.npc, this.x, this.y - 100, 200, 200);
		}

		if (dialog.response) {
			fill(this.humanColor);
			text(this.reponseType[dialog.response], character.x + 20, character.y - 20, 200, 300);
		} else {
			fill(255);
			text("hit enter", this.x, this.y + 50);
		}

		if (dialog.human) {
			fill(this.humanColor);
			text(dialog.human, character.x, character.y - 20, 200, 300);
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

	updateDialog(character) {
		const dialog = this.dialog[this.dialogCount];

		// surface or collect items
		if (!dialog.read && dialog.item) {
			dialog.read = true;
			character.collectItem(dialog.item);
		}

		if (dialog.response && keyIsDown(49) && !this.keysDown.a) {
			if (Array.isArray(dialog.a)) {
				const options = dialog.a;
				let newItem = false;
				for (let i = 0; i < options.length; i++) {
					const next = options[i];
					const { item, needs } = this.dialog[next];
					const charItem = character.items[item];
					if (needs == 'surfaced' && charItem.surfaced && !charItem.collected) {
						this.dialogCount = next;
						newItem = true;
						break;
					}
				}
				// done with options
				if (!newItem) this.dialogCount = dialog.default;
			} else {
				this.dialogCount = dialog.a;
			}
			this.keysDown.a = true;
			return;
		} else if (!keyIsDown(49)) {
			this.keysDown.a = false;
		}

		if (dialog.response && keyIsDown(50) && !this.keysDown.b) {
			this.dialogCount = dialog.b;
			this.keysDown.b = true;
			return;
		} else if (!keyIsDown(50)) {
			this.keysDown.b = false;
		}

		if (keyIsDown(ENTER) && !this.keysDown.enter) {
			if (!dialog.response) {
				this.dialogCount = dialog.next;
			}
			this.keysDown.enter = true;
		} else if (!keyIsDown(ENTER)) {
			this.keysDown.enter = false;
		}


	}
}