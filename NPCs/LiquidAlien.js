class LiquidAlien extends NPC {
	constructor(x, y, spriteSheet) {
		super(x, y, spriteSheet, 'Cyan', 'white');

		this.dialog = [
			/* 0 */ { npc: "hello" },
			/* 1 */ { human: "Hello, do you have something I can use to get out of here? I need help." },
			/* 2 */ { npc: "I have a map. I also have a key, but I don't know what it unlocks. Anyway, what can you give me in return?" },
			/* 3 */ { human: "(That key probably unlocks something important.) Well I do need a map, what do you want?"  },
			/* 4 */ { npc: 'Well, maps are pretty valuable around here, so can you help me achieve a dream?' },
			/* 5 */ { human: "I guess I can try. What is it?" },
			/* 6 */ { npc: "I want to see what freezing feels like, but it's hard to find anything cold enough." },
			/* 7 */ { human: "What would be cold enough?" },
			/* 8 */ { npc: "Maybe like a black hole? But it would have to be small and contained. I don't want to completely freeze.", surface: "blackHole" },
			/* 9 */ { human: "That sounds hard to find, is there anything else you would want?" },
			/* 10 */ { npc: "No." },
			/* 11 */ { human: "Great. I'll try to find something." },

			/* needsCollected is to go to next ... */

			/* 12 */ { npc: "(She has nothing else to say to you right now.)", auto: 13 },
			/* 13 */ { npc: "Did you manage to find something?", needsCollected: 'blackHole' },
			/* 14 */ { response: "choice [1]: heres the blackhole [2]: *throw blackhole into alien and freeze her for the key* [3]: not yet", a: 15, b: 16, c: 12, default: 12 },
			/* 15 */ { npc: "Thank you very much, here's a map.", item: 'unmarkedMap', next: 20 },
			/* 16 */ { npc: "!!!", animation: 'frozen', next: [17, 18] },
			/* 17 */ { needsCollected: 'icepick', human: "You break off pieces with key and the map", item: ['frozenMap', 'frozenKey'], animation: 'cut', next: 21 },
			/* 18 */ { human: "I need something to break off the pieces I want", auto: 17, next: 17  },
			/* 19 */ { npc:  "(You need something sharp to break off pieces)", next: 17 },
			/* 20 */ { npc: "(She's happy and has nothing else to say to you)", isEnd: true },
			/* 21 */ { npc: "(You don't need anything else from her.)", isEnd: true, }


		];


	}
}