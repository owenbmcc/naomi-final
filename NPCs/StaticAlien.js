class StaticAlien extends NPC {
	constructor(x, y, spriteSheet) {
		super(x, y, spriteSheet, 'CadetBlue', 'DarkGoldenRod');

		this.dialog = [
			/*  0 */ { npc: 'Hi...' },
			/*  1 */ { human:  "Hello...? Are you ok?" },
			/*  2 */ { npc: "I guess. I don't really know." },
			/*  3 */ { human: "Okay... well do you have anything I can use to get off this planet?" },
			/*  4 */ { npc: "I don't think so." },
			/*  5 */ { human: "(I think this thing's made of energy, I can feel the static through my  suit.) Is there something you need?" },
			/*  6 */ { npc: "I want to learn about other alien species." },
			/*  7 */ { human: "If I help you do that, will you help me and give me some energy?" },
			/*  8 */ { npc: "Okay, I can't give you too much though, I don't want to die ;(." },
			/*  9 */ { human: "Alright, I'll be back", surface: 'cJournal', next: [12, 10] },

			/* options for auto -- this is a bit convoluted .. but easier than figuring it out */
			/* 10 */ { npc: '(It has nothing else to say to you right now)', auto: [12, 13], },
			/* 11 */ { npc: '(It has nothing else to say to you right now)', needsCollected: 'emptyBattery', auto: 13, },

			/* should only show if human does not have battery collected */
			/* 12 */ { human: "I should go get my battery before I talk to it again", needsSurfaced: 'emptyBattery', auto: [11]  },

			/* 13 */ { npc: 'Oh, you got something', needsCollected: ['cJournal', 'emptyBattery'], },
			/* 14 */ { human: "Yup, it's a chronicle of numerous different species, exactly what you wanted." },

			/* this dialog sets cJournal to false in the original code -- do items need to be removed so they aren't used more than once ? */
			/* 15 */ { npc: 'Thank you. What do you want me to do?', remove: 'cJournal', },

			/* 16 */ { response: 'Have refill battery [1]partially (safe for the alien, but will take longer and be harder to get home) or [2]completely (unsafe for the alien, but gives you all the energy you need)?', a: 17, b: 19, },
			/* 17 */ { human: "You will be safe, just touch here.", },
			/* 18 */ { npc: "*You refill the battery just enough to get home*", item: ['partBattery', 'emptyBattery'], animation: 'QC', next: 22 },
			/* 19 */ { human: "You'll probably be okay, just touch here.", item: ['fullBattery', 'emptyBattery'] },
			/* 20 */ { npc: "*You refill the battery completely and the alien disappears*", item: ['fullBattery', 'emptyBattery'], animation: 'Bad', },
			/* 21 */ { human: "It dropped the chronicle of other aliens, It'll be great to take with me to earth. *You pick it up*", item: ['cJournal'], },
			/* 22 */ { npc: "There's nothing but static here.",  isEnd: true },
			/* 23 */ { npc: " (It seems content and has nothing else to say)", isEnd: true, }

		];
	}
}