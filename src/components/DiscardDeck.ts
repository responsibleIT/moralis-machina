import { customElement } from 'lit/decorators.js';
import { DeckElement } from './Deck.ts';
import { css, html } from 'lit';

@customElement('discard-deck-element')
export class DiscardDeckElement extends DeckElement {
    static styles = css`
        .deck {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    `;

    public get getCards() {
        return this._cards;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`
            <div class="deck">
                ${this._cards.map((card) => html`<div>${card}</div>`)}
            </div>
        `;
    }
}
