const API_URL = ""; // ← Laisse vide si API et interface sur le même Render
let currentMove = "UP";
let currentAction = "NONE";

function sendCommand(move) {
  currentMove = move;
  updateCommand();
}

function sendAction(action) {
  currentAction = action;
  updateCommand();
}

function updateCommand() {
  fetch(`${API_URL}/command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ move: currentMove, action: currentAction }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(
        "currentCommand"
      ).textContent = `${data.command.move} / ${data.command.action}`;
    })
    .catch((err) => console.error("Erreur:", err));
}
