import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ScenarioCardElement } from './ScenarioCard.ts';

@customElement('deck-element')
export class DeckElement extends LitElement {

    @property({ type: Array })
    private _cards: ScenarioCardElement[] = [];

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
        this.shuffle();
    }

    shuffle() {
        this._cards.sort(() => Math.random() - 0.5);
    }

    push(card: ScenarioCardElement) {
        this._cards.push(card);
        this.requestUpdate();
    }

    draw() {
        return this._cards!.pop();
    }

    render() {
        console.log(this._cards)
        return html`
            <div class="deck">
                ${this._cards.map((card) => html`<div>${card}</div>`)}
            </div>
        `;
    }
}
