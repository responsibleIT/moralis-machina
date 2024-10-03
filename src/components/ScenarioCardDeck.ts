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

        .card-container{
            width: 100%;
            position: relative;
            top: 0;
            left: 0;
            transition: top 0.5s ease-in-out, left 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        .is-container-flipped {
            z-index: 999;
            top: 100px;
            left: 200px;
            transform: translate(50%, 30px) scale(1.2);
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
                    <div class="card-container" style="grid-area: 1/1/1/1; padding-top: ${20 * index /4}px;">${card}</div>`)}
            </div>
        `;
    }
}
