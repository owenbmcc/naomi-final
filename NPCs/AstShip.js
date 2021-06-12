class AstShip extends NPC {
	constructor(x, y, spriteSheet) {
		super(x, y, spriteSheet, 'LightSteelBlue', 'white');

		this.dialog = [
			/* this number is the index in the dialog list, advanced by dialogCount */
			/* 0 */ { npc: "Your Ship", next: 1 },

			/* ab response, two options, either index number for dialog or options 
				.surfaced.10 (and now collected) if surfaced go to 10
				else go to next 
				if none are chosen go to default
			*/
			/* 1 */ { npc: "Do you need something from your Ship?", response: 'ab', a: [10, 11], b: 2, default: 4 },
			/* 2 */ { npc: "Do you need to know what else you need before you take off or Do you want to take off? ", response: 'ab', a: 3, b: 0 },

			/* requirements are for the ship to display what is done */
			/* 3 */ { npc: "You'll need certain things:", requirements: true, next: 0, },
			/* 4 */ { npc: "(You don't seem to need anything else right now)", next: 0, },
			/* 5 */ { npc: "Take off?", },
			/* 6 */	{},
			/* 7 */	{},
			/* 8 */	{},
			/* 9 */ {},

			/* item will give item to character 
				surface will surface an item */
			/* 10 */ { item: 'icepick', needs: 'surfaced', npc: '(You received the cutting tool)', next: 1, },
			/* 11 */ { item: 'empty_battery', needs: 'surfaced', npc: '(You received the empty battery)', next: 1, },



		];

		this.requirements = [
			{ needed: "You need ship repairs", achieved: "You're ship has been repaired", done: false },
			{ needed: "You need your ship uprighted", achieved: "Your ship has been uprighted", done: false },
			{ needed: "You need a battery with energy", achieved: "Your battery has energy", done: false },
			{ needed: "You need an unfrozen, marked map", achieved: "You're map's marked.", done: false },
		];

	}
}