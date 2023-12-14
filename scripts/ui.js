const safeZoneSlider = document.getElementById('safeZoneSlider');
const safeZoneValue = document.getElementById('safeZoneValue');
const safeZoneShape = document.getElementById('safeZoneShape');
const pointsNumberValue = document.getElementById('pointsNumberValue');
const pointsNumberSlider = document.getElementById('pointsNumberSlider');
const algorithmSelect = document.getElementById('algorithmSelect');
const simulationTypeSelect = document.getElementById('simulationTypeSelect');

safeZoneSlider.addEventListener("input", () => {
    safeZoneValue.value = safeZoneSlider.value;
    safeZone = safeZoneSlider.value;
    generatePoints();
    updateCanvas();
})

safeZoneValue.addEventListener("input", () => {
    var num = Math.floor(safeZoneValue.value)

    safeZone = num;
    safeZoneSlider.value = num;

    generatePoints();
    updateCanvas();
})

pointsNumberSlider.addEventListener("input", () => {
    pointsNumberValue.value = pointsNumberSlider.value;
    pointsNum = pointsNumberSlider.value;

    generatePoints();
    updateCanvas();
})

pointsNumberValue.addEventListener("input", () => {
    var num = Math.floor(pointsNumberValue.value)

    pointsNum = num;
    pointsNumberSlider.value = num;

    generatePoints();
    updateCanvas();
})

safeZoneShape.addEventListener("input", () => {
    zoneType = safeZoneShape.value;
    generatePoints();
    updateCanvas();
})




simulationTypeSelect.addEventListener("input", () => {
    simulationType = simulationTypeSelect.value;
})

function startAlgorithm() {

    if (algorithm == "grahamScan") {
        if (simulationType == "stepByStep") {
            grahamScanStepByStep(100);
        } else if (simulationType == "fast") {
            grahamScanStepByStep(0);
        } else if (simulationType == "instant") {
            grahamScan();
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    generatePoints();
    updateCanvas();

})