export class api {
    private editor: HTMLDivElement;
    
    constructor(node: HTMLDivElement) {
        this.editor = node
    }

    wordCountInit(where: HTMLParagraphElement): void {
        this.editor.oninput = () => {
            where.innerHTML = this.editor.innerHTML.replace(/(&nbsp; )/g, "").split(" ").length.toString()
        }
    }

    runOnInput(callback: Function): void {
        this.editor.oninput = () => {
            callback()
        }
    }

    getHTML(): string {
        return this.editor.innerHTML
    }

    setHTML(html: string): void {
        this.editor.innerHTML = html
    }

    appendHTML(html: string): string {
        this.editor.innerHTML += html
        return this.editor.innerHTML
    }
}