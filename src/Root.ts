import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import './components/ScenarioCard.ts'
import {ScenarioType} from "./enums/ScenarioType.ts";
import {ScenarioCardElement} from "./components/ScenarioCard.ts";
import {CardType} from "./enums/CardType.ts";

import './components/Board.ts'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('root-element')
export class RootElement extends LitElement {
    /**
     * Copy for the read the docs hint.
     */
    @property()
    docsHint = 'Click on the Vite and Lit logos to learn more'

    /**
     * The number of times the button has been clicked.
     */
    @property({type: Number})
    count = 0

    connectedCallback() {
        console.log("Initializing...")

        super.connectedCallback()
    }


    render() {
        return html`
        <h1>Moralis Machina</h1>
        <board-element></board-element>
    `;
    }

    private _onClick() {
        this.count++
    }

    static styles = css`
        
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'root-element': RootElement
    }
}
