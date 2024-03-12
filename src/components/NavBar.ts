import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

@customElement('navbar-element')
export class NavBarElement extends LitElement {

    handleHelp() {
        // dialog box
        alert("This is a game where you have to find the traitor in your midst. The traitor will try to sabotage your efforts to complete the mission. You have to find out who the traitor is and stop them from sabotaging the mission.")
    }
    connectedCallback() {
        super.connectedCallback()
    }


    render() {
        return html`
            <nav>
                <a href="/"><h1>Moralis Machina</h1></a>
                <h1 class="help-button" @click=${this.handleHelp}>?</h1>
            </nav>
        `;
    }


    static styles = css`
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid #e0e0e0;
        }

        nav > a {
            text-decoration: none;
            color: black;
        }

        .help-button {
            cursor: pointer;
            border: 2px solid gray;
            border-radius: 1000px;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'navbar-element': NavBarElement
    }
}
