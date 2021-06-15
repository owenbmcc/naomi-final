/*
	not drawable, just tracks item data
*/

class Item {
	constructor(surfaced, collected) {
		this.surfaced = surfaced || false;
		this.collected = collected || false;
	}
}