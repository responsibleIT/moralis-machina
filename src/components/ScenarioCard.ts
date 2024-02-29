import {css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {CardElement} from "./Card.ts";
import {ScenarioColor, ScenarioType} from "../enums/ScenarioType.ts";

@customElement('scenario-card-element')
export class ScenarioCardElement extends CardElement {
    @property({type: ScenarioType})
    type: ScenarioType

    @property({type: Array<String>})
    questions: Array<String>

    constructor(name: string,
                context: string,
                image: string,
                type: ScenarioType,
                questions: Array<String>) {
        super(name, context, image);
        this.type = type;
        this.questions = questions;
    }

    render() {
        let color = ScenarioColor[this.type]
        return html`
            <div class="card" style="background-color: ${color}">
                <button @click=${this.flip}>Flip</button>
                <div class="card-front">
                    <img src="${this.image}" alt="image">
                    <div class="card-name">${this.name}</div>
                </div>
                <div class="card-rear">
                    <div>${this.context}</div>
                    <div>${this.type}</div>
                    <div>${this.questions}</div>
                </div>
            </div>
        `
    }
}
