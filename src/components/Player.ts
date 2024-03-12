import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {RoleType} from "../enums/RoleType.ts";

@customElement('player-element')
export class PlayerElement extends LitElement {
    @property({ type: String })
    private readonly _name: string;

    @property({ type: RoleType })
    private _role: RoleType;


    get role(): RoleType {
        return this._role;
    }

    set role(value: RoleType) {
        this._role = value;
    }

    constructor(name: string, role: RoleType) {
        super();
        this._name = name;
        this._role = role;
    }

   static styles = css`

   `


    render(){
        return html`
            <div>
                <div>
                    <div><strong>${this._name}</strong></div>
                    <div>${this._role}</div>
                    <hr/>
                </div>
            </div>
        `;
    }
}