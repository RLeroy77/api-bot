let currentMove = "STAY";
let currentAction = "NONE";

// Marquer les boutons actifs
function highlightActiveButtons() {
  // Réinitialise tous les boutons
  document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
  // Active ceux qui correspondent à la commande actuelle
  const moveBtn = document.getElementById(`btn-${currentMove}`);
  const actionBtn = document.getElementById(`btn-${currentAction}`);
  if (moveBtn) moveBtn.classList.add("active");
  if (actionBtn) actionBtn.classList.add("active");
}

// Envoie une commande au serveur
async function sendCommand(move = currentMove, action = currentAction) {
  if (move) currentMove = move;
  if (action) currentAction = action;

  await fetch("/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ move: currentMove, action: currentAction }),
  });

  updateStatus();
}

// Récupère la commande actuelle depuis le serveur
async function updateStatus() {
  try {
    const res = await fetch("/action");
    const data = await res.json();
    currentMove = data.move;
    currentAction = data.action;

    document.getElementById("status").innerText = `Commande actuelle : ${data.move} / ${data.action}`;
    highlightActiveButtons();
  } catch (err) {
    document.getElementById("status").innerText = "Erreur lors de la récupération de la commande.";
  }
}

// Mise à jour automatique
setInterval(updateStatus, 1000);
updateStatus();
