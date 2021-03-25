import { api } from "./api";
import * as $ from "jquery";

const Editor: HTMLDivElement = document.querySelector("#editor")
const WordCounter: HTMLParagraphElement = document.querySelector("#wordCount")

$("#boldBtn").on("click", () => {
    if ($("#boldBtn").attr("class").includes("active")) {
        $("#boldBtn").attr("class", $("#boldBtn").attr("class").replace(/( active)/g, ""))
        Editor.innerHTML = Editor.innerHTML.replace(/(<b>)/g, "").replace(/(<\/b>)/g, "")
    } else {
        $("#boldBtn").attr("class", $("#boldBtn").attr("class")+" active")
        Editor.innerHTML = "<b>" + Editor.innerHTML + "</b>"
    }
})

var EditorContext: api = new api(Editor)

console.log(EditorContext.getHTML())

//register word counter
EditorContext.wordCountInit(WordCounter)