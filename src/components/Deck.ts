import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ScenarioCardElement} from './ScenarioCard.ts';
import {ScenarioType} from '../enums/ScenarioType.ts';

@customElement('deck-element')
export abstract class DeckElement extends LitElement {

    @property({type: Array})
    protected _cards: ScenarioCardElement[] = [];

    static styles = css`
        .deck {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
    }

    public push (card: ScenarioCardElement) {
        this._cards.push(card);
        this.requestUpdate();
    }

    public draw() {
        let card = this._cards.pop();
        console.log("draw count", this._cards.length)
        return card;
    }

    render() {
        return html`
            <div class="deck">
                ${this._cards.map((card) => html`
                    <div style="grid-area: 1/1/2/2">${card}</div>`)}
            </div>
        `;
    }
}
