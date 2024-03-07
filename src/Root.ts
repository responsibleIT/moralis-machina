import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import './components/ScenarioCard.ts'
import {ScenarioType} from "./enums/ScenarioType.ts";
import {ScenarioCardElement} from "./components/ScenarioCard.ts";
import {CardType} from "./enums/CardType.ts";

import './components/Deck.ts'

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
        let redCards: ScenarioCardElement[] = [];
        for (let i = 0; i < 20; i++) {
            const card = new ScenarioCardElement(
                "Test" + i,
                "Test" + i,
                "Test" + i,
                CardType.ScenarioCard,
                ScenarioType.RED,
                ["1", "2"],
                ["1", "2"]
            );
            redCards.push(card);
        }



        return html`
        <h1>Moralis Machina</h1>
        <div>
            <button @click=${this._onClick}>
                count is ${this.count}
            </button>
        </div>
        <deck-element ._cards="${redCards}"></deck-element>
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
