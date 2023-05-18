const card = document.querySelector(".card")
const versionTitle = document.querySelector("#version-title")
const categoryTitle = document.querySelector("#category-title")
const contentCard = document.querySelector(".card-text")
const table = document.querySelector("#myTable");


// Evento botones 
let buttonsArchivos = document.querySelectorAll(".btn-archivos")
let buttonsDetalles = document.querySelectorAll(".btn-detalles")
let buttonsConfiguracion = document.querySelectorAll(".btn-configuracion")

buttonsArchivos.forEach(button => {
    button.addEventListener("click", () => {
        let parentRow = button.parentElement.parentElement
        verArchivos(parentRow)
    })
});

buttonsDetalles.forEach(button => {
    button.addEventListener("click", () => {
        let parentRow = button.parentElement.parentElement
        verDetalles(parentRow)
    })
});

buttonsConfiguracion.forEach(button => {
    button.addEventListener("click", () => {
        let parentRow = button.parentElement.parentElement
        verConfiguracion(parentRow)
    })
});


let verArchivos = (parentRow) => {
    showCard();
    versionTitle.innerHTML = getVersion(parentRow)
    categoryTitle.innerHTML = "Arhivos"
    document.querySelector("#archivos-content").classList.remove("d-none")
}

let verDetalles = (parentRow) => {
    showCard();
    versionTitle.innerHTML = getVersion(parentRow)
    categoryTitle.innerHTML = "Detalles"
    document.querySelector("#detalles-content").classList.remove("d-none")
}

let verConfiguracion = async (parentRow) => {
    showCard();
    versionTitle.innerHTML = getVersion(parentRow)
    categoryTitle.innerHTML = "Configuración"
    await fetchFile() //Fetch text of external files
    document.querySelector("#configuracion-content").classList.remove("d-none")
}

let showCard = () => {
    card.classList.remove("d-none")
    // Ocultar todos
    document.querySelector("#archivos-content").classList.add("d-none")
    document.querySelector("#detalles-content").classList.add("d-none")
    document.querySelector("#configuracion-content").classList.add("d-none")
}

let getVersion = (row) => {
    return "Versión " + row.querySelector("td").innerHTML
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
        // Replace all spaces 
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

// let navOpen = true;
let sidebar = document.querySelector("#sidebar");
let minContent = document.querySelector("#min-content");
let maxContent = document.querySelector("#max-content");

document.querySelector("#btn-close-sidebar").addEventListener("click", () => {
    showSideBar(false)
})

document.querySelector("#btn-open-sidebar").addEventListener("click", () => {
    showSideBar(true)
})

let showSideBar = (bool) => {
    const classes = ['col-lg-2', 'col-md-3', 'col-sm-2'];

    (bool) ? sidebar.classList.add(...classes) : sidebar.classList.remove(...classes)

    document.querySelector("#sidebar").classList.toggle('col-sm-1');
    document.querySelector("#max-content").classList.toggle('d-none');
    document.querySelector("#min-content").classList.toggle('d-none');
}
