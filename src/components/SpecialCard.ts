import {html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {CardElement} from "./Card.ts";
import {CardType} from "../enums/CardType.ts";
import { SpecialColor, SpecialType } from '../enums/SpecialType.ts';

@customElement('special-card-element')
export class SpecialCardElement extends CardElement {

    @property({type: SpecialType})
    private readonly _specialType

    @property({ type: Boolean })
    private _isActive: boolean = false;

    constructor(cardName: string,
                context: string,
                image: string,
                specialType: SpecialType,
                cardType: CardType,) {
        super(cardName, context, image, cardType);
        this._specialType = specialType;
    }
    
    private toggleActive() {
        this._isActive = !this._isActive;
        this.shadowRoot?.querySelector('.card')?.classList.toggle('special-card-active', this._isActive);
    }

    render() {
        let color = SpecialColor[this._specialType]
        return html` 
            <button class="special-card-button" @click="${this.toggleActive}">
                <p>Kies ${this.cardName}</p>
                <img src="./card-images/${this.image}.png" alt="image" />
            </button>
            <div class="card special-card" style="background-color: ${color}" @click="${this.toggleActive}">
                <div class="card-face card-front">
                    <h3 class="card-name" style="border-color: ${color}">${this.cardName}</h3>
                    <p class="card-context">${this.context}</p>
                    <img src="./card-images/${this.image}.png" alt="image">                
                </div>
            </div>
        `
    }
}