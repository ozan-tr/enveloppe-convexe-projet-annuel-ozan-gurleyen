const safeZoneSlider = document.getElementById('safeZoneSlider');
const safeZoneValue = document.getElementById('safeZoneValue');
const safeZoneShape = document.getElementById('safeZoneShape');
const pointsNumberInput = document.getElementById('pointsNumberInput');
const algorithmSelect = document.getElementById('algorithmSelect');
const simulationTypeSelect = document.getElementById('simulationTypeSelect');

safeZoneSlider.addEventListener("input",()=> {
    safeZoneValue.innerHTML = safeZoneSlider.value;
    safeZone = safeZoneSlider.value;
    generatePoints();
    updateCanvas();
    
})

safeZoneShape.addEventListener("input",()=> {
    zoneType = safeZoneShape.value;
    generatePoints();
    updateCanvas();
})

pointsNumberInput.addEventListener("input",()=> {
    pointsNum = pointsNumberInput.value;
    generatePoints();
    updateCanvas();
})


simulationTypeSelect.addEventListener("input",()=> {
    simulationType = simulationTypeSelect.value;
})

function startAlgorithm(){

    if (algorithm == "grahamScan"){
        if(simulationType == "stepByStep"){
            grahamScanStepByStep(100);
        }else if(simulationType == "fast"){
            grahamScanStepByStep(0);
        }else if(simulationType == "instant"){
            grahamScan();
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    generatePoints();
    updateCanvas();
    
})