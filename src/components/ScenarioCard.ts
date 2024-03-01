import {css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {CardElement} from "./Card.ts";
import {CardType} from "../enums/CardType.ts";
import {ScenarioColor, ScenarioType} from "../enums/ScenarioType.ts";

@customElement('scenario-card-element')
export class ScenarioCardElement extends CardElement {
    private readonly _tags: Array<String>
    private readonly _scenarioType: ScenarioType
    private readonly _questions: Array<String>

    constructor(cardName: string,
                context: string,
                image: string,
                cardType: CardType,
                scenarioType: ScenarioType,
                questions: Array<String>,
                tags : Array<String>) {
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

    render() {
        let color = ScenarioColor[this._scenarioType]
        return html`
            <div class="card" style="background-color: ${color}">
                <button @click=${this.flip}>Flip</button>
                <div class="card-front">
                    <img src="${this.getImage}" alt="image">
                    <div class="card-name">${this.cardName}</div>
                </div>
                <div class="card-rear">
                    <div>${this.context}</div>
                    <div>${this._scenarioType}</div>
                    <div>${this._questions}</div>
                </div>
            </div>
        `
    }
}
