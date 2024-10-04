import { css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {CardElement} from "./Card.ts";
import {CardType} from "../enums/CardType.ts";
import {RoleColor, RoleType} from "../enums/RoleType.ts";

@customElement('role-card-element')
export class RoleCardElement extends CardElement {

    @property({type: RoleType})
    private readonly _roleType

    constructor(cardName: string,
                context: string,
                image: string,
                roleType: RoleType,
                cardType: CardType,) {
        super(cardName, context, image, cardType);
        this._roleType = roleType;
    }

    render() {
        let color = RoleColor[this._roleType]
        return html`
                <!-- <div class="card role-card" style="background-color: ${color}"> -->
                <div class="card role-card">
                    <div class="card-face card-front">
                        <h3 class="card-name" style="border-color: ${color}">${this.cardName}</h3>
                        <p class="card-context">${this.context}</p>
                        <img src="./card-images/${this.image}.webp" alt="image">                   
                    </div>
                </div>
        `
    }
}
