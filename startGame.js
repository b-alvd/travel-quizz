document.addEventListener("DOMContentLoaded", function() {
    start = document.getElementById("startGame");
    start.addEventListener("click", function() {
        confirm("Voulez-vous lancer la partie ?");
    });
})