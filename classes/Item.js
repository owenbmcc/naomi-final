/*
	not drawable, just tracks item data
*/

class Item {
	constructor(owner, surfaced, collected) {
		this.owner = owner;
		this.surfaced = surfaced || false;
		this.collected = collected || false;
	}
}