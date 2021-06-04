/*
	final project
	mmp 310
	fall 2019
*/


var scene = 'splash';

var sceneManager = {};
sceneManager['splash'] = new Splash();
sceneManager['marsii'] = new marsii();

function preload() {
	for (var s in sceneManager) {
		sceneManager[s].preload();
	}
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.drawingContext.miterLimit = 2;

	for (var s in sceneManager) {
		sceneManager[s].setup();
	}

	sceneManager[scene].start();
}

function draw() {
	sceneManager[scene].draw();
}

function changeScene(_scene) {
	sceneManager[scene].end();
	scene = _scene;
	sceneManager[scene].start();
}