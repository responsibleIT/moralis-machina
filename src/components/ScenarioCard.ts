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
            <div class="card-outer">
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
        `
    }
}
