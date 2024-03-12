import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {RoleCardElement} from "./Rolecard.ts";
import {RoleType} from "../enums/RoleType.ts";

@customElement('player-element')
export class PlayerElement extends LitElement {
    @property({ type: String })
    private _name: string;

    @property({ type: RoleType })
    private _role: RoleType;

    constructor(name: string, role: RoleType) {
        super();
        this._name = name;
        this._role = role;
    }

    render(){
        return html`
            <div class="player">
                <h1>${this._name}</h1>
                <div>${this._role}</div>
            </div>
        `;
    }
}