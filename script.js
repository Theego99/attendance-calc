function calculatePercent() {
    let total = document.getElementById("total").value;
    let missed = document.getElementById("missed").value;
    let late = document.getElementById("late").value;
    
    late = Math.trunc(late / 3);
    missed = parseInt(missed) + late;
    
    if (total > 0) {
        let percent = 100 - (100 / total * missed);
        document.getElementById("result").innerHTML = percent.toFixed(2) + "%";
    } else {
        document.getElementById("result").innerHTML = "Total must be greater than 0";
    }
}
