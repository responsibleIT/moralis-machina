import {css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {CardElement} from "./Card.ts";
import {CardType} from "../enums/CardType.ts";
import {ScenarioColor, ScenarioType} from "../enums/ScenarioType.ts";

@customElement('scenario-card-element')
export class ScenarioCardElement extends CardElement {
    @property({type: Array<String>})
    private readonly _tags

    @property({type: ScenarioType})
    private readonly _scenarioType

    @property({type: Array<String>})
    private readonly _questions

    constructor(cardName: string,
                context: string,
                image: string,
                cardType: CardType,
                scenarioType: ScenarioType,
                questions: Array<String>,
                tags: Array<String>) {
        super(cardName, context, image, cardType);
        this._scenarioType = scenarioType;
        this._questions = questions;
        this._tags = tags;
    }

    //Getters for the private properties
    public get getTags(): Array<String> {
        return this._tags;
    }

    public get getScenarioType(): ScenarioType {
        return this._scenarioType;
    }

    public get getQuestions(): Array<String> {
        return this._questions;
    }

    static styles = [
        CardElement.styles,
        css`
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

        `]

    showModal(event: Event) {
        event.stopPropagation()

        let modal = this.shadowRoot?.getElementById("cardModal") as HTMLElement
        modal.style.display = "flex"
    }

    hideModal(event: Event) {
        event.stopPropagation()

        let modal = this.shadowRoot?.getElementById("cardModal") as HTMLElement
        modal.style.display = "none";
    }


    render() {
        let color = ScenarioColor[this._scenarioType]
        return html`
            <div class="card-outer">
                <div class="card" style="background-color: ${color}">
                    <button @click=${this.flip}>Flip</button>
                    <div class="card-face card-front" @click=${this.showModal}>
                        <img src="${this.image}" alt="image">
                        <div class="card-name">${this.cardName}</div>
                    </div>
                    <div class="card-face card-rear" @click=${this.showModal}>
                        <div>${this.context}</div>
                        <div>${this._scenarioType}</div>
                        <div>${this._questions}</div>
                    </div>
                </div>
            </div>

            <div id="cardModal" class="modal">

                <span class="close" @click="${this.hideModal}">&times;</span>

                <div class="card-outer modal-card">
                    <div class="card" style="background-color: ${color}">
                        <button @click=${this.flip}>Flip</button>
                        <div class="card-face card-front" @click=${this.focus}>
                            <img src="${this.image}" alt="image">
                            <div class="card-name">${this.cardName}</div>
                        </div>
                        <div class="card-face card-rear" @click=${this.focus}>
                            <div>${this.context}</div>
                            <div>${this._scenarioType}</div>
                            <div>${this._questions}</div>
                        </div>
                    </div>
                </div>


                <button>Afleggen</button>
            </div>
        `
    }
}
