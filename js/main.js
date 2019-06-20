const baseUrl = "https://www.cloudconformity.com/conformity-rules";

document.addEventListener("DOMContentLoaded", function (event) {
    // Your code to run since DOM is loaded and ready
    const jsonData = fetchData(
        "https://us-west-2.cloudconformity.com/v1/services"
    );
});

function fetchData(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            // console.log(JSON.stringify(jsonData));
            createLists(jsonData);
        })
        .catch(error => console.error(error));
}

function compare(a, b) {
    if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
    if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
    return 0;
}

function createSortedIncludedData(includedData) {
    let currentId = "";
    let sortedData = {};

    includedData.forEach(item => {
        if (currentId === "") {
            currentId = item.id.split("-")[0];
            sortedData[currentId] = [];
            sortedData[currentId].push(item);
        }

        let newId = item.id.split("-")[0];
        if (newId === currentId) sortedData[currentId].push(item);
        else {
            currentId = item.id.split("-")[0];
            sortedData[currentId] = [];
            sortedData[currentId].push(item);
        }
    });

    // console.log(sortedData);
    return sortedData;
}

function createLists(arrayDict) {
    let section = document.getElementById("links");
    // console.log(arrayDict);

    let sortedData = arrayDict.data.sort(compare);
    let sortedIncludedData = createSortedIncludedData(arrayDict.included);
    // console.log(sortedData);

    sortedData.forEach(element => {
        //   console.log(element.id);
        let div = document.createElement("div");

        // create Title of each data
        let h3 = document.createElement("h3");
        h3.className = "m-3"
        let a = document.createElement("a");
        a.href = baseUrl + "/" + element.id;
        a.innerText = element.id;
        h3.appendChild(a);

        //create a list of sublinks from each item
        //   let ul = document.createElement("ul");
        //   ul.className = "list-group";
        //   element.relationships.rules.data.forEach(data => {
        //     const id = data.id;
        //     // const item = arrayDict.included.find(item => item.id == id);
        //     const item = _.find(arrayDict.included, { id: id });
        //     console.log(item);
        //     ul.appendChild(createSubLists(item, a.href));
        //   });
        let elementAbreviaton = element.relationships
            .rules.data[0].id.split("-")[0];
        let ul = createSubLists(
            sortedIncludedData[elementAbreviaton],
            a.href
        );

        //add to the container
        div.appendChild(h3);
        div.appendChild(ul);
        section.appendChild(div);
    });
}

function createSubLists(items, headerUrl) {
    // let li = document.createElement("li");
    // li.className = "list-group-item";
    // let a = document.createElement("a");
    // a.href = new URL(item.attributes.slug, headerUrl);
    // a.innerHTML = item.attributes.title;

    // li.appendChild(a);
    // return li;

    // console.log(items, headerUrl);


    let ul = document.createElement("ul");
    ul.className = "list-group-flush";
    items.forEach(item => {
        let li = document.createElement("li");
        li.className = "list-group-item border-0";
        let a = document.createElement("a");
        a.href = headerUrl + '/' + item.attributes.slug + '.html';
        a.className = "text-secondary";
        // console.log(a.href);
        a.innerHTML = item.attributes.title;

        li.appendChild(a);
        ul.appendChild(li);
    });

    return ul;
}