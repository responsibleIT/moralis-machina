import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

    render() {
        return html`
            <div class="deck">
                ${this._cards.map((card) => html`<div>${card}</div>`)}
            </div>
        `;
    }
}
