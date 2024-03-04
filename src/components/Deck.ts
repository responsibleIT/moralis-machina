import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {CardElement} from "./Card.ts";

@customElement('deck-element')
export class DeckElement<T> extends LitElement {
    private _cards:T[] = [];

    constructor(cards: T[]) {
        super();
        this._cards = cards;
    }

    static styles = css`
        .deck {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    `

    public get cards(): T[] {
        return this._cards;
    }

    shuffle() {
        //Shuffle the deck

    }

    push(card: T) {
        this._cards.push(card)
    }

    draw() {
        //TODO: Fix when stack is empty
        return this._cards?.pop()!
    }

    render() {
        return html`
            <div class="deck">
                <h1>Deck</h1>
                
                ${this._cards.map((card) => html`<div>${card}</div>`)}
            </div>
        `
    }
}
