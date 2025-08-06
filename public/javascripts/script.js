let currentMove = "UP";
let currentAction = "NONE";

async function sendCommand(move = currentMove, action = currentAction) {
  currentMove = move;
  currentAction = action;

  await fetch("/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ move, action }),
  });

  document.getElementById(
    "status"
  ).innerText = `Commande envoyée : ${move} / ${action}`;
}
