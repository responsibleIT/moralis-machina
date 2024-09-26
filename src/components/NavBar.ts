import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

@customElement('navbar-element')
export class NavBarElement extends LitElement {

    handleHelp() {
        // dialog box
        alert("show help modal")
    }
    connectedCallback() {
        super.connectedCallback()
    }


    render() {
        return html`
            <nav>
                <a href="/"><h1>Moralis Machina</h1></a>
                <button class="help-button" @click=${this.handleHelp}>?</button>
            </nav>
        `;
    }


    static styles = css`
        h1 {
            font-family: "Abril Fatface", serif;
            font-size: 4rem;
            font-weight: 100;
        }
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            // border-bottom: 1px solid #e0e0e0;
            border-bottom: 1px solid rgb(255 0 0);
        }

        nav > a {
            text-decoration: none;
            color: black;
        }

        button.help-button {
            cursor: pointer;
            border: 2px solid gray;
            font-family: "Abril Fatface", serif;
            border-radius: 100rem;
            width: 4rem;
            height: 4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            font-size: 3rem;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'navbar-element': NavBarElement
    }
}
