document.addEventListener("DOMContentLoaded", () => {
    let idCounter = 0;
    const form = document.getElementById("inner");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let input = document.getElementById("inputTask").value;
        let node = document.createElement("li");
        node.innerHTML = `<label><input type='checkbox'></label>${input} <a id="clear${idCounter}">&#10060</a>;`;
        node.id = idCounter;
        document.getElementById("list").appendChild(node);
        const clearButton = document.getElementById("clear" + idCounter);
        clearButton.addEventListener("click", () => {
            let list = document.getElementById("list");
            list.removeChild(node);
        });
        idCounter+=1;
        document.getElementById("inputTask").value = "";
    });
});
