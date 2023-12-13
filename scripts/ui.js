const safeZoneSlider = document.getElementById('safeZoneSlider');
const safeZoneValue = document.getElementById('safeZoneValue');
const safeZoneShape = document.getElementById('safeZoneShape');

generatePoints()
updateCanvas()

safeZoneSlider.addEventListener("input",(event)=> {
    safeZoneValue.innerHTML = safeZoneSlider.value;
    safeZone = safeZoneSlider.value;
    generatePoints();
    updateCanvas();
})

safeZoneShape.addEventListener("input",(event)=> {
    zoneType = safeZoneShape.value;
    generatePoints();
    updateCanvas();
})

document.addEventListener("DOMContentLoaded", function(event) {
    updateCanvas();
})