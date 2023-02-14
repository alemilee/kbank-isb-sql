
const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
    // id를 통해 식별
    const howdyButton = document.getElementById("howdy");
    // eventlistener
    howdyButton.addEventListener("click", handleHowdyClick);
}

// 전송될 message
function handleHowdyClick() {
    vscode.postMessage({
        command: "hello",
        text: "Hey there partner!s",
    });
}