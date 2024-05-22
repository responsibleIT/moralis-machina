import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ScenarioCardElement } from './ScenarioCard.ts';

@customElement('deck-element')
export abstract class DeckElement extends LitElement {
    @property({ type: Array<ScenarioCardElement> })
    _cards: ScenarioCardElement[] = [];

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
        this.requestUpdate();
        return card;
    }

    public peek() {
        return this._cards[0]

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
