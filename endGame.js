document.addEventListener("DOMContentLoaded", function() {
  const RESTART_BUTTON = document.getElementById("restart_button");
  const SCORE = localStorage.getItem('score');
  
  RESTART_BUTTON.addEventListener("click", function() {
    localStorage.setItem('score', 0);
    window.location.replace("game.html");
  })
  
  document.getElementById("display_points_end").innerText = `Vous avez terminé avec ${SCORE} points`
  
  console.log(SCORE);
})

