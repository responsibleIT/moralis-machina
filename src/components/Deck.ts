import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {CardElement} from "./Card.ts";

@customElement('deck-element')
export class DeckElement extends LitElement {
    @property({type: Array<CardElement>})
    cards: Array<CardElement>

    constructor(cards: Array<CardElement>) {
        super();
        this.cards = cards;
    }

    static styles = css`
        .deck {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    `

    shuffle() {
    }

    push(card: CardElement) {
        this.cards.push(card)
    }

    draw(): CardElement  {
        //TODO: Fix when stack is empty
        return this.cards?.pop()!
    }


    render() {
        return html`
            <div class="deck">
                <h1>Deck</h1>
                
                ${this.cards.map((card) => html`<div>${card}</div>`)}
            </div>
        `
    }
}
