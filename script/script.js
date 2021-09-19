$(".browse-button").on("click", () => {
    $("#file").click();
})

$("#file").on("change", ({ target }) => {

    const formData = new FormData();

    const files = target.files;

    const file_name = "file[]";
    const folder_name = "folder[]";

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.name !== "") {
            formData.append(file_name, file);
            formData.append(folder_name, file.webkitRelativePath);
        }
    }

    const xml = new XMLHttpRequest();

    xml.onreadystatechange = () => {
        if (xml.readyState == XMLHttpRequest.DONE) {
            console.log(xml.responseText);
        }
    }
    xml.upload.onprogress = ({ loaded, total }) => {
        const progress = ((loaded / total) * 100).toFixed(0) + "%";

        $(".progress-bar").html(progress);
        $(".progress-bar").css("width", progress);

        if (progress === "100%") {
            $(".progress-bar").html("0%");
            $(".progress-bar").css("width", "0%");
        }
    }

    xml.open("POST", "index.php", true);
    xml.send(formData);

});