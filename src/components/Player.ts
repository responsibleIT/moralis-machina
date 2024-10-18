import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {SpecialType} from "../enums/SpecialType.ts";

@customElement('player-element')
export class PlayerElement extends LitElement {
    @property({ type: String })
    private readonly _name: string;

    @property({ type: SpecialType })
    private _role: SpecialType;


    get role(): SpecialType {
        return this._role;
    }

    set role(value: SpecialType) {
        this._role = value;
    }

    constructor(name: string, role: SpecialType) {
        super();
        this._name = name;
        this._role = role;
    }

   static styles = css`
       .player {
           padding-top: 0.6rem;
           padding-bottom: 0.6rem;
       }

   `

    render(){
        return html`
            <div class="player">
                <div><strong>${this._name}</strong></div>
                <div>${this._role}</div>
                <hr/>
            </div>
        `;
    }
}