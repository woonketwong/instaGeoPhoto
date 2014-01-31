$(function() {
	var i = 0;
	var photo;
	var body = $("body");

	body.on("dragstart", "img", function(event) {
		event.preventDefault();
	});
	
	body.on("mousedown", ".photo", function() {
		i++;
		photo = $(this);
		var angle = Math.floor(Math.random()*10)-5;
		
		photo.css({
			"cursor": "url(images/grab.png), move",
			"z-index": i,
			"-moz-transform": "rotate(" + angle + "deg) scale(1.2,1.2)",
			"-webkit-transform": "rotate(" + angle + "deg) scale(1.2,1.2)",
			"transform": "rotate(" + angle + "deg) scale(1.2,1.2)"
		});
	}).on("mouseup", function() {
		if (photo) {
			var angle = Math.floor(Math.random()*30)-20;
	
			photo.css({
				"-moz-transform": "rotate(" + angle + "deg) scale(1,1)",
				"-webkit-transform": "rotate(" + angle + "deg) scale(1,1)",
				"transform": "rotate(" + angle + "deg) scale(1,1)",
				"cursor": "url(images/hand.png), pointer"
			});
			photo = null;
		}
	});
});

// Search and fetch properties from object literal
function findProperty(obj, prop, val, propToFetch) {
	var answer;
	if (obj.hasOwnProperty(prop) && obj[prop] === val) {
		return obj[propToFetch];
	}
	for (var i = 0, len = obj.length; i < len; i++) {
		answer = findProperty(obj[i], prop, val, propToFetch);
		if (answer !== null) {
			return answer;
		}
	}
	return null;
}