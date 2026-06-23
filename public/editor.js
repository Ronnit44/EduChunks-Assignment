const editor = document.getElementById("editor");
const indicator = document.getElementById("sync-indicator");
const boldBtn = document.getElementById("bold");
const italicBtn = document.getElementById("italic");
const strikeBtn = document.getElementById("strike");

let isRemoteUpdate = false;

editor.addEventListener("keydown", (event) => {

  const isUndo =
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "z";

  const isRedo =
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "y";

  if (isUndo) {
    setTimeout(() => {
      sendUpdate("undo");
    }, 0);
  }

  if (isRedo) {
    setTimeout(() => {
      sendUpdate("redo");
    }, 0);
  }
});
function showSyncIndicator() {
  indicator.style.opacity = "1";

  setTimeout(() => {
    indicator.style.opacity = "0";
  }, 1000);
}

function sendUpdate(action = "input") {
  if (isRemoteUpdate) {
    return;
  }

  window.parent.postMessage(
    {
      type: "FORMAT_SYNC",
      action,
      html: editor.innerHTML,
    },
    "*"
  );
}

boldBtn.addEventListener("click", () => {
  document.execCommand("bold");
  updateToolbarState();
  sendUpdate("bold");
});

italicBtn.addEventListener("click", () => {
  document.execCommand("italic");
  updateToolbarState();
  sendUpdate("italic");
});

strikeBtn.addEventListener("click", () => {
  document.execCommand("strikeThrough");
  updateToolbarState();
  sendUpdate("strike");
});

// BONUS: Text Sync
editor.addEventListener("input", () => {
  sendUpdate("input");
});

function updateToolbarState() {
  boldBtn.classList.toggle(
    "active",
    document.queryCommandState("bold")
  );

  italicBtn.classList.toggle(
    "active",
    document.queryCommandState("italic")
  );

  strikeBtn.classList.toggle(
    "active",
    document.queryCommandState("strikeThrough")
  );
}

document.addEventListener(
  "selectionchange",
  updateToolbarState
);

window.addEventListener("message", (event) => {

  // Origin Validation
  if (!event.origin.startsWith("http://localhost")) {
    return;
  }

  if (event.data.type !== "FORMAT_SYNC") {
    return;
  }

  isRemoteUpdate = true;
  editor.innerHTML = event.data.html;
  showSyncIndicator();
  isRemoteUpdate = false;
});