/*
	not drawable, just tracks item data
*/

class Item {
	constructor(owner, message, surfaced, collected) {
		this.owner = owner;
		this.message = message;
		this.surfaced = surfaced || false;
		this.collected = collected || false;
	}
}