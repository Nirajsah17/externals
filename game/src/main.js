// HTML element 
let btnCreate = document.getElementById('btnCreate');
let btnJoin = document.getElementById('btnJoin');
let txtGameId = document.getElementById('txtGameId');
let divPlayers = document.getElementById('divPlayers');

// Wiring events

let clientId = null,
  gameId = null, ws;

ws = new WebSocket("ws://localhost:8080");

btnCreate.addEventListener('click', e => {
  const payLoad = {
    "method": "create",
    "clientId": clientId
  }
  ws.send(JSON.stringify(payLoad));
});

btnJoin.addEventListener('click', e => {
  if (!gameId === null)
    gameId = txtGameId.value;
  const payLoad = {
    "method": "join",
    "clientId": clientId,
    "gameId": gameId
  }
  ws.send(JSON.stringify(payLoad));
});

ws.onmessage = message => {
  // message data
  const response = JSON.parse(message.data);
  console.log("obj", response);
  if (response.method === "connect") {
    clientId = response.clientId;
    console.log("client Id set successfully", clientId);
  }
  if (response.method === "create") {
    // clientId = response.clientId;
    gameId = response.game.id;
    console.log("client Id set successfully", response.game.id + "with " + response.game.balls + " balls");
  }
  if (response.method === "join") {
    console.log("join", response);
    const game = response.game;

    while(!divPlayers.firstChild)
    divPlayers.removeChild(divPlayers.firstChild)

    game.clients.forEach(c =>{

      const d = document.createElement("div");
      d.style.width = "200px";
      d.style.background = c.color;
      d.textContent = c.clientId;
      divPlayers.appendChild(d);
    })
  }

}


