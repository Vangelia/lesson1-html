let items = [];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inner");

    items = loadItems();

    let idCounter = items.length;

    listMaker();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let input = document.getElementById("inputTask").value;

        const json = {
            id : idCounter,
            input : input,
            isChecked : false
        };
        saveItem(json);

        listMaker();

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
    items = loadItems();
    items.push(item);
    localStorage.setItem(KEY, JSON.stringify(items));
}

function remover(id) {
    items = items.filter((item) => id !== item.id);
    localStorage.setItem(KEY, JSON.stringify(items));
    listMaker(items);
}


function listMaker() {
    document.getElementById("list").innerText = "";
    for (let item of items) {
        let node = document.createElement("li");

        node.innerHTML = `<label><input type='checkbox' checked=${item.isChecked}></label>${item.input} <a id="clear${item.id}" onclick="remover(${item.id})">&#10060</a>;`;
        node.id = item.id;
        document.getElementById("list").appendChild(node);
    }
}