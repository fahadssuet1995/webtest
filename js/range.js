const range1 = document.getElementById("range1");
const opt1 = document.getElementById("opt1");
const range2 = document.getElementById("range2");
const opt2 = document.getElementById("opt2");
const val = range1.value;
range1.addEventListener("change", () => {
    opt1.value = range1.value
})
