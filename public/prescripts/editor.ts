const Editor: HTMLTextAreaElement = document.querySelector("#editor")

Editor.oninput = () => {
    //change textbox height based on enters
    Editor.style.height = "";
    Editor.style.height = Editor.scrollHeight + "px"

    //display wordcount
    document.querySelector("#wordCount").innerHTML = Editor.value.trim().split(" ").length.toString()
};
