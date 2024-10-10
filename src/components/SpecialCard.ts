import { css, html} from 'lit'
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
        const card = this.shadowRoot?.querySelector('.card');
        card?.classList.toggle('special-card-active', this._isActive);

        if (this._isActive) {
            setTimeout(() => document.addEventListener('click', this.handleClickOutside), 0);
        } else {
            document.removeEventListener('click', this.handleClickOutside);
        }
    }

    private handleClickOutside = (event: MouseEvent) => {
        if (!this.shadowRoot?.querySelector('.card')?.contains(event.target as Node)) {
            this.toggleActive();
        }
    };


    render() {
        let color = SpecialColor[this._specialType]
        return html` 
            <div class="card special-card" style="background-color: ${color}" @click="${this.toggleActive}">
                    <div class="card-face card-front">
                        <h3 class="card-name" style="border-color: ${color}">${this.cardName}</h3>
                        <p class="card-context">${this.context}</p>
                        <img src="./card-images/${this.image}.webp" alt="image">                   
                    </div>
                </div>
        `
    }
}
