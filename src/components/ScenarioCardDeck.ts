import {css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ScenarioType } from '../enums/ScenarioType.ts';
import { DeckElement } from './Deck.ts';

@customElement('scenariocard-deck-element')
export class ScenarioCardDeckElement extends DeckElement {
    @property({type: ScenarioType})
    private _deckType: ScenarioType = ScenarioType.RED;

    static styles = css`
        .deck {
            display: grid;
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

    render() {
        return html`
            <div class="deck">
                ${this._cards.map((card, index) => html`
                    <div style="grid-area: 1/1/1/1; padding-top: ${10 * index /4}px;">${card}</div>`)}
            </div>
        `;
    }
}
