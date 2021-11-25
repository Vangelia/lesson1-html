document.addEventListener("DOMContentLoaded", () => {
    let idCounter = 0;
    const form = document.getElementById("inner");

    const items = loadItems();
    listMaker(items);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let input = document.getElementById("inputTask").value;
        let node = document.createElement("li");

        node.innerHTML = `<label><input type='checkbox'></label>${input} <a id="clear${idCounter}">&#10060</a>;`;
        node.id = idCounter;

        const json = {
            id : idCounter,
            input : input,
            isChecked : false
        };
        saveItem(json);

        document.getElementById("list").appendChild(node);

        const clearButton = document.getElementById("clear" + idCounter);
        clearButton.addEventListener("click", () => {
            let list = document.getElementById("list");
            list.removeChild(node);
            localStorage.removeItem('element');
        });

        idCounter+=1;
        document.getElementById("inputTask").value = "";
    });
});

const KEY = 'element';

function loadItems() {
    const str = localStorage.getItem(KEY);
    if (!str) {
        return [];
    }
    return JSON.parse(str);
}

function saveItem(item) {
    const items = loadItems();
    items.push(item);
    localStorage.setItem(KEY, JSON.stringify(items));
}

function listMaker(items) {
    for (let item of items) {
        let node = document.createElement("li");

        node.innerHTML = `<label><input type='checkbox' checked=${item.isChecked}></label>${item.input} <a id="clear${item.id}">&#10060</a>;`;
        document.getElementById("list").appendChild(node);
    }
}