import { html} from 'lit'
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

    private requestDiscard() {
        this.dispatchEvent(new CustomEvent('request-discard', {
            bubbles: true,
            composed: true,
            detail: {
                card: this
            }
        }));
        this.classList.add("discard-card")
        this.requestUpdate();
    }

    _getCardClass() {
        switch (this._scenarioType) {
            case ScenarioType.YELLOW:
                return 'card-yellow';
            case ScenarioType.BLUE:
                return 'card-blue';
            case ScenarioType.GREEN:
                return 'card-green';
            case ScenarioType.RED:
                return 'card-red';
            default:
                return '';
        }
    }


    render() {
        let color = ScenarioColor[this._scenarioType]
        return html`
            <div class="card-outer ${this._getCardClass()}" @click=${this.flip}>
                <div class="card" style="background-color: ${color}">
                    <!-- <button class="flip-button"></button> -->
                    <div class="card-face card-front">
                        <img src="${this.image}" alt="image">
                        <h3 class="card-name">${this.cardName}</h3>
                    </div>
                    <div class="card-face card-back" @click=${this.flip}>
                        <h3 class="rear-name">${this.cardName}</h3>
                        <div class="rear-context">${this.context}</div>
                        <div class="rear-hr"></div>
                            <!--                        <div class="rear-scenario">${this._scenarioType}</div>-->
                        <div class="question-container">
                            <div class="rear-question1">${this._questions[0]}</div>
                            <div class="rear-question2">${this._questions[1]}</div>
                        </div>

                        <div class="filler"></div>
                        <div class="tag-container">
                            <div class="rear-tag1">${this._tags[0]}</div>
                            <div class="rear-tag2">${this._tags[1]}</div>
                        </div>
                        <button @click="${this.requestDiscard}" class="card-button">
                            Afleggen
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}
