const card = document.querySelector(".card")
const versionTitle = document.querySelector("#version-title")
const categoryTitle = document.querySelector("#category-title")
const contentCard = document.querySelector(".card-text")
const table = document.querySelector("#myTable");


let getVersion = (row) => {
    return "Versión " + table.rows[row].querySelector("td").innerHTML
}

let showCard = () => {
    card.classList.remove("d-none")
    // Ocultar todos
    document.querySelector("#archivos-content").classList.add("d-none")
    document.querySelector("#detalles-content").classList.add("d-none")
    document.querySelector("#configuracion-content").classList.add("d-none")
}

let verArchivos = (row) => {
    // Show card
    showCard();

    versionTitle.innerHTML = getVersion(row)
    categoryTitle.innerHTML = "Arhivos"
    document.querySelector("#archivos-content").classList.remove("d-none")
}

let verDetalles = (row) => {
    // Show card
    showCard();

    versionTitle.innerHTML = getVersion(row)
    categoryTitle.innerHTML = "Detalles"
    document.querySelector("#detalles-content").classList.remove("d-none")
}

let verConfiguracion = async (row) => {
    // Show card
    showCard();

    versionTitle.innerHTML = getVersion(row)
    categoryTitle.innerHTML = "Configuración"

    await fetchFile()

    document.querySelector("#configuracion-content").classList.remove("d-none")

}

let fetchFile = async () => {
    // First File
    let response = await fetch('http://localhost:5500/changes/file1.txt');
    let data = await response.text();

    let databg = await addBackground(data);

    document.querySelector("#collapseOne .accordion-body").innerHTML = databg;

    //Second File
    response = await fetch('http://localhost:5500/changes/file2.txt');
    data = await response.text();
    databg = await addBackground(data);
    document.querySelector("#collapseTwo .accordion-body").innerHTML = databg;

    //Third File
    response = await fetch('http://localhost:5500/changes/file3.txt');
    data = await response.text();
    databg = await addBackground(data);
    document.querySelector("#collapseThree .accordion-body").innerHTML = databg;

}

let addBackground = async (data) => {
    var lines = data.split("\n");
    var txt = ''

    for (let [i, value] of lines.entries()) {
        // Replace spaces 
        console.log(value)
        value = value.replaceAll(' ', '&ensp;');
        // Replace symbol <> to show plain text
        value = value.replaceAll('<', '&lt;');
        value = value.replaceAll('>', '&gt;');

        if (value[0] == '+') {
            txt += "<p class='bg-success-subtle m-0'>" + value + "</p>"
        } else if (value[0] == '-') {
            txt += "<p class='bg-danger-subtle m-0'>" + value + "</p>"
        } else {
            txt += "<p class='m-0'>" + value + "</p>"
        }

    }

    return txt;
}
