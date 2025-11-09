const slider = document.getElementById("percentage-slider");
const percentageDisplay = document.getElementById("percentage-value");
const peopleInput = document.getElementById("people-select");
slider.addEventListener("change", () => {
    const percentage = slider.value;
    percentageDisplay.textContent = `${percentage.toFixed(2) * 100}%`;
    const people = parseInt(peopleInput.value, 10);
    const results = updateAllCalculations(people, percentage);
    results.forEach(result => {
        const element = document.getElementById(`impact-${result.key}`);
        if (element) {
            element.querySelector(".saved").textContent = result.saved;
            element.querySelector(".baseline").textContent = result.baseline;
        }
    });
});
peopleInput.addEventListener("change", () => {
    const people = parseInt(peopleInput.value, 10);
    const percentage = slider.value;
    const results = updateAllCalculations(people, percentage);
    results.forEach(result => {
        const element = document.getElementById(`impact-${result.key}`);
        if (element) {
            element.querySelector(".saved").textContent = result.saved;
            element.querySelector(".baseline").textContent = result.baseline;
        }
    });
});
const resultsContainer = document.getElementById("results-container");
const people = parseInt(peopleInput.value, 10);
const percentage = slider.value;
const results = updateAllCalculations(people, percentage);
results.forEach(result => {
    resultsContainer.innerHTML += `<div id="impact-${result.key}" class="impact-result">
        <h3>${result.impact}</h3>
        <p>Saved: <span class="saved">${result.saved}</span></p>
        <p>Baseline: <span class="baseline">${result.baseline}</span></p>
    </div>`;
})


