import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {CardElement} from "./Card.ts";
import {ScenarioColor} from "../enums/ScenarioType.ts";
import {ScenarioCardElement} from "./ScenarioCard.ts";
@customElement('current-card-element')
export class CurrentCardElement extends LitElement {

    @property({ type: CardElement })
    private _card: CardElement;

    @property({ type: Boolean })
    private _isVisible = false;

    @property({ type: Boolean })
    private _isFlipped = false;


    get card(): CardElement {
        return this._card;
    }

    set card(value: CardElement) {
        this._card = value;
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(value: boolean) {
        this._isVisible = value;
    }

    get isFlipped(): boolean {
        return this._isFlipped;
    }

    set isFlipped(value: boolean) {
        this._isFlipped = value;
    }

    showModal() {
        this._isVisible = true;

        let cardModal = this.shadowRoot?.getElementById('cardModal') as HTMLElement;
        cardModal.style.display = "flex";

    }

    hideModal() {
        this._isVisible = false;

        let cardModal = this.shadowRoot?.getElementById('cardModal') as HTMLElement;
        cardModal.style.display = "none";
    }

    constructor(card: CardElement) {
        super();
        this._card = card;
    }

    static styles = css`
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
            flex-direction: column;
            align-items: center;
            justify-content: center;
            scale: 2;
        }

        .close {
            color: #f1f1f1;
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
        }
    `

    render() {
        return html`
            <div id="cardModal" class="modal">
                <span class="close" @click="${this.hideModal}">&times;</span>
                
                ${this.card}
                
                <button>Afleggen</button>
            </div>
        `;
    }

}