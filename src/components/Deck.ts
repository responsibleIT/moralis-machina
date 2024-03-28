import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ScenarioCardElement } from './ScenarioCard.ts';
import { ScenarioType } from '../enums/ScenarioType.ts';

@customElement('deck-element')
export class DeckElement extends LitElement {

    @property({ type: Array })
    private _cards: ScenarioCardElement[] = [];

    @property({ type: ScenarioType })
    private _deckType: ScenarioType = ScenarioType.RED;

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

    public get getDeckType() {
        return this._deckType;
    }

    public set setDeckType(deckType: ScenarioType) {
        this._deckType = deckType;
    }

    connectedCallback() {
        super.connectedCallback();
        this.shuffle();
    }

    shuffle() {
        this._cards.sort(() => Math.random() - 0.5);
    }

    push(card: ScenarioCardElement) {
        this._cards.push(card);
        this.requestUpdate();
    }

    peek() {
        let card = this._cards[this._cards.length - 1];
        console.log("peek count", this._cards.length)
        return card;
    }

    draw() {
        let card = this._cards.pop();
        console.log("draw count", this._cards.length)
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
