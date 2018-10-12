const button = document.getElementById("fastNPCButton");
const popup = document.getElementById("pop-up-fast-NPC");

document.addEventListener("click", (elem) => {
    if(elem.srcElement.id === "fastNPCButton") {
        popup.classList.toggle("invisible");
    } else if(!elem.srcElement.classList.contains("clickProof")) {
        popup.classList.add("invisible");
    }
});