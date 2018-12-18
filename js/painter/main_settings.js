const minValue = 0;
const maxValue = 30;

// Slider object instances
var sliderSize = new Slider('#_size', {
  id: "_size",
  min: minValue,
  max: maxValue,
  step: 1,
  value: [bubble.minSize, bubble.maxSize],
  tooltip: "hide",
});

var sliderRoundness = new Slider('#_roundness', {
  id: "_roundness",
  min: 0,
  max: 1,
  step: 0.1,
  value: [0, 1],
  tooltip: "hide",
});

var sliderRotation = new Slider('#_rotation', {
  id: "_rotation",
  min: 0,
  max: 360,
  step: 5,
  value: [0, 360],
  tooltip: "hide",
});

var sliderOpacity = new Slider('#_opacity', {
  id: "_opacity",
  min: 0,
  max: 1,
  step: 0.1,
  value: [bubble.alphaMin, bubble.alphaMax],
  tooltip: "hide",
});

var sliderStroke = new Slider('#_stroke', {
  id: "_stroke",
  min: minValue,
  max: maxValue,
  step: 1,
  value: [8, 28],
  tooltip: "hide",
});

var sliderQuantity = new Slider('#_quantity', {
  id: "_quantity",
  min: minValue,
  max: maxValue,
  step: 1,
  value: bubble.quantity,
  tooltip: "hide",
});

// Slider events
sliderSize.on("slide", function(sliderValue) {
  bubble.minSize = sliderValue[0];
  bubble.maxSize = sliderValue[1];
});

sliderStroke.on("slide", function(sliderValue) {
  // map(mouseX, halfWidth, windowWidth, 100, 0);
  // bubble.minStroke = sliderValue[0];
  // bubble.maxStroke = sliderValue[1];
});

sliderQuantity.on("slide", function(sliderValue) {
  bubble.quantity = map(sliderValue, minValue, maxValue, 0, 100);
  console.log(bubble.quantity)
});

sliderOpacity.on("slide", function(sliderValue) {
  bubble.alphaMin = sliderValue[0];
  bubble.alphaMax = sliderValue[1];
});