const slider = document.getElementById("percentage-slider");
const percentageDisplay = document.getElementById("percentage-value");
const peopleInput = document.getElementById("people-select");
slider.addEventListener("change", () => {
    const percentage = slider.value;
    percentageDisplay.textContent = `${(percentage * 100).toFixed(0)}%`;
    const people = parseInt(peopleInput.value, 10);
    const results = updateAllCalculations(people, percentage);
    results.forEach(result => {
        const element = document.getElementById(`impact-${result.key}`);
        if (element) {
            element.querySelector(".total").textContent = parseInt(result.total);
            element.querySelector(".saved").textContent = parseInt(result.saved);
            element.querySelector(".baseline").textContent = parseInt(result.baseline);
            element.querySelector(".percent-change").textContent = `${result.percentChange.toFixed(2)}%`;
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
            element.querySelector(".total").textContent = parseInt(result.total);
            element.querySelector(".saved").textContent = parseInt(result.saved);
            element.querySelector(".baseline").textContent = parseInt(result.baseline);
            element.querySelector(".percent-change").textContent = `${result.percentChange.toFixed(2)}%`;
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
        <p>Total: <span class="total">${parseInt(result.total)}</span></p>
        <p>Saved: <span class="saved">${parseInt(result.saved)}</span></p>
        <p>Baseline: <span class="baseline">${parseInt(result.baseline)}</span></p>
        <p>Percent Change: <span class="percent-change">${result.percentChange.toFixed(2)}%</span></p>
    </div>`;
})


