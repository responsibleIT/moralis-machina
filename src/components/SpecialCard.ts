import {css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {CardElement} from "./Card.ts";
import {CardType} from "../enums/CardType.ts";

@customElement('special-card-element')
export class SpecialCardElement extends CardElement {
    constructor(cardName: string,
                context: string,
                image: string,
                cardType: CardType,) {
        super(cardName, context, image, cardType);
    }

    render() {
        return html` `
    }
}
