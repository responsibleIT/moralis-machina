import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import './components/ScenarioCard.ts'
import './components/Deck.ts'
import {ScenarioType} from "./enums/ScenarioType.ts";

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
        for (let i = 0; i < 20; i++) {
            const card = document.createElement('scenario-card') as any
            card.name = "Name" + i
            card.context = "Context" + i
            card.scenarioType = ScenarioType.GENERIC
            this.appendChild(card)

        }

        return html`
            <h1>Moralis Machina</h1>
            <div>
                <button @click=${this._onClick}>
                    count is ${this.count}
                </button>
            </div>
            <deck-element cards="${[]}"></deck-element>
        `
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
