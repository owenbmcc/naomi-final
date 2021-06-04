class NPC extends Scenery {
	constructor(x, y, spriteSheet, dialog, name) {
		super(x, y, spriteSheet);
		this.dialog = dialog;
		this.name = name;
		this.dialogCount = 0; // starting at 0, even is npc, odd is character
		this.getResponse = false;

		this.textColor = 'LightSteelBlue';
		this.humanColor = 'white';

		this.items = [];


		// connect dialog to items

		
		this.dialog = [
			{ npc: "Your Ship", next: 1 },
			{ npc: "Do you need something from your Ship?", response: 'ab', a: 10, b: 2 },
			{ npc: "Do you need to know what else you need before you take off or Do you want to take off? ", response: 'ab', a: 5, b: 0 },
			{ npc: "You'll need certain things:", requirements: true, next: 0, },
			{ npc: "(You don't seem to need anything else right now)", next: 0, },
			{ npc: "Take off?", }

		];

		this.requirements = [
			{ needed: "You need ship repairs", achieved: "You're ship has been repaired", done: false },
			{ needed: "You need your ship uprighted", achieved: "Your ship has been uprighted", done: false },
			{ needed: "You need a battery with energy", achieved: "Your battery has energy", done: false },
			{ needed: "You need an unfrozen, marked map", achieved: "You're map's marked.", done: false },

		];

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

		if (dialog.npc && !this.getResponse) {
			fill(this.textColor);
			text(dialog.npc, this.x, this.y - 100, 200, 200);
		}

		if (this.getResponse) {
			fill(this.humanColor);
			text(this.reponseType[dialog.response], character.x, character.y - 20, 200, 300);
		}

		if (dialog.human) {
			fill(this.humanColor);
			text(dialog.human, character.x, character.y - 20, 200, 300);
		}

		fill(255);
		text("hit enter", this.x, this.y + 50);

	}

	updateDialog() {
		const dialog = this.dialog[this.dialogCount];
		console.log(this.getResponse, keyIsDown(49), this.keysDown.a, this.dialogCount, dialog.a);
		if (this.getResponse && keyIsDown(49) && !this.keysDown.a) {
			this.dialogCount = dialog.a;
			this.keysDown.a = true;
			this.getResponse = false;
			return;
		} else if (!keyIsDown(49)) {
			this.keysDown.a = true;
		}

		if (this.getResponse && keyIsDown(50) && !this.keysDown.b) {
			this.dialogCount = dialog.b;
			this.keysDown.b = true;
			this.getResponse = false;
			return;
		} else if (!keyIsDown(50)) {
			this.keysDown.b = false;
		}

		if (keyIsDown(ENTER) && !this.keysDown.enter) {
			if (dialog.response) {
				this.getResponse = true;
			} else {
				this.dialogCount += 1;
			}
			this.keysDown.enter = true;
		} else if (!keyIsDown(ENTER)) {
			this.keysDown.enter = false;
		}


	}
}