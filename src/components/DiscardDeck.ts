import { customElement, property } from 'lit/decorators.js';
import { ScenarioCardElement } from './ScenarioCard.ts';
import { DeckElement } from './Deck.ts';
import { IRequestReturnCard } from '../interfaces/IRequestReturnCard.ts';
import { css, html } from 'lit';

@customElement('discard-deck-element')
export class DiscardDeckElement extends DeckElement implements IRequestReturnCard {

    @property({ type: Array })
    protected _cards: ScenarioCardElement[] = [];

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

    requestReturnCard() {
        this.dispatchEvent(new CustomEvent('request-return-card', {
            detail: {
                card: this._cards[this._cards.length - 1]
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="deck" @click=${this.requestReturnCard}>
                ${this._cards.map((card) => html`<div>${card}</div>`)}
            </div>
        `;
    }
}
