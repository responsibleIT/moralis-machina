import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ScenarioCardElement} from './ScenarioCard';

@customElement('current-card--container-element')
export class CurrentCardContainerElement extends LitElement{
    @property({type: ScenarioCardElement})
    private _card!: ScenarioCardElement | null;

    @property({type: Boolean})
    private _isDisplayed = false;

    @property({type: Boolean})
    private _isFlipped = false;

    connectedCallback() {
        super.connectedCallback();

        // @ts-ignore
        this.addEventListener('request-set-current-card', this.setCurrentCard);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        // @ts-ignore
        this.removeEventListener('request-set-current-card', this.setCurrentCard);
    }

    get card(): ScenarioCardElement {
        return this._card!;
    }

    get isDisplayed(): boolean {
        return this._isDisplayed;
    }

    get isFlipped(): boolean {
        return this._isFlipped;
    }

    private toggleModalVisibility() {
        // Toggle the display state
        this._isDisplayed = !this._isDisplayed;

        let cardModal = this.shadowRoot?.querySelector('.modal') as HTMLElement;
        if (cardModal) {
            // Use _isDisplayed to determine the display style
            cardModal.style.display = this._isDisplayed ? "flex" : "none";
        }
    }

    private setCurrentCard(event: CustomEvent) {
        this._card = event.detail.card
        this.toggleModalVisibility();
        this.requestUpdate();
    }

    private unsetCurrentCard() {
        this.dispatchEvent(new CustomEvent('request-unset-current-card', {
            bubbles: true,
            composed: true,
            detail: {
                card: this._card
            }
        }));

        this._card = null;
        this.toggleModalVisibility();
        this.requestUpdate();
    }

    private requestDiscard() {
        this.dispatchEvent(new CustomEvent('request-discard', {
            bubbles: true,
            composed: true,
            detail: {
                card: this._card
            }
        }));

        this._card = null;
        this.toggleModalVisibility();
        this.requestUpdate();
    }

    static styles = css`
        .modal {
            display: none; /* None by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0, 0, 0, 0.3); /* Black w/ opacity */
            flex-direction: column;
            align-items: center;
            justify-content: center;
            scale: 2;
        }

        .close {
            color: #f1f1f1;
            font-size: 4rem;
            font-weight: bold;
            transition: 0.3s;
            cursor: pointer;
        }
    `

    render() {
        return html`
            <div id="cardModal" class="modal">
                <button @click="${this.unsetCurrentCard}">Terugzetten</button>
                <div class="cardHolder">
                    ${this._card}
                </div>
                <button @click="${this.requestDiscard}">Afleggen</button>
            </div>
        `;
    }

}
