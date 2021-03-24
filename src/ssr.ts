import * as pages from "./navbar.json";

function navBar(html: string): string {
    let navbarString: string = "";

    pages.forEach(page => {
        navbarString += `
                <li class="nav-item active">
                    <a class="nav-link" href="${page.pagePath}">${page.pageName}</a>
                </li>`
    })

    html = html.replace(/({{navbar}})/g, navbarString)
    
    return html;
}

export { navBar }