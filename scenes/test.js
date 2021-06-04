class marsii extends Scene {
	preload() {
		//Main character - Astronaut
		this.walkright = loadSpriteSheet('images/marsii/astwalkr.png', 64, 128, 8);
		this.walkleft = loadSpriteSheet('images/marsii/astwalkl.png', 64, 128, 8);
		this.walkup = loadSpriteSheet('images/marsii/astwalku.png', 64, 128, 8);
		this.walkdown = loadSpriteSheet('images/marsii/astwalkd.png', 64, 128, 8);
		this.idle = loadSpriteSheet('images/marsii/astidle.png', 64, 128, 15);

		// add npcs here to loop through and display
		this.npcs = {};

		var trailSheet = loadSpriteSheet('images/marsii/scenery/crashtrail.png', 546, 90, 1);
		this.shipTrail = new Scenery(1177, 552, trailSheet);

        const astShipSheet = loadSpriteSheet('images/marsii/npcs/brokenship.png', 353, 188, 1);
        this.npcs.astShip = new NPC(730, 500, astShipSheet, "Your ship");

		var treeSheet = loadSpriteSheet('images/marsii/scenery/treeoverlayed.png', 1370, 1342, 1);
		this.treeOverlay = new Scenery(-1950, 80, treeSheet);

		var caveSheet = loadSpriteSheet('images/marsii/scenery/caveoverlay.png', 1808, 830, 1);
		this.caveOverlay = new Scenery(-1365, 1577, caveSheet);

		var pondSheet = loadSpriteSheet('images/marsii/scenery/pond.png', 848, 810, 5);
		this.pond = new Scenery(50, 1595, pondSheet);

		var lightningSheet = loadSpriteSheet('images/marsii/scenery/lightning.png', 1480, 560, 8);
		this.lightning = new Scenery(220, -700, lightningSheet);

		var watertreeSheet = loadSpriteSheet('images/marsii/scenery/watertree.png', 470, 640, 6);
		this.watertree = new Scenery(597, 1225, watertreeSheet);


		this.map = new Map();
		this.map.preload('data/marsii.json');
	}

	setup() {
		this.character = new Character({
			walkright: loadAnimation(this.walkright),
			walkleft: loadAnimation(this.walkleft),
			walkup: loadAnimation(this.walkup),
			walkdown: loadAnimation(this.walkdown),
			idle: loadAnimation(this.idle)
		});
		this.character.changeAnimation('idle');

		this.map.setup();

		this.items = {
			icepick: { has: 'astShip', m: " (You recieved the cutting tool) ", },
			empty_battery: { has: 'astShip', m: " (You recieved the empty battery) " },
			backuplog: { has: '' }
		};

		for (const k in this.npcs) {
			this.npcs[k].setup()
		}

		this.shipTrail.setup();
		

	}

	start() {
		this.map.start();
	}


	draw() {
		if (mouseIsPressed) camera.zoom = 0.3;
		else camera.zoom = 1;

		this.map.collide(this.character);
		this.map.move(this.character);
		this.map.display();

		

		for (const k in this.npcs) {
			this.npcs[k].display()
			if (this.npcs[k].overlap(this.character)) {
				this.npcs[k].displayDialog(this.character);
				this.npcs[k].updateDialog();	
			}
		}

		this.shipTrail.display();
		this.treeOverlay.display();
		this.caveOverlay.display();
		this.pond.display();
		this.watertree.display();
		this.lightning.display();

		this.character.update();
		this.character.display();
	}
}