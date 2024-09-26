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
            cardModal.style.visibility = this._isDisplayed ? "visible" : "hidden";
            cardModal.style.opacity = this._isDisplayed ? "1" : "0"
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
            visibility: hidden;
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            right: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0, 0, 0, 0.3); /* Black w/ opacity */
            flex-direction: column;
            align-items: center;
            justify-content: center;
            scale: 1;
            opacity: 0;
            transition: 0.5s ease-in-out;
        }

        .close {
            color: #f1f1f1;
            font-size: 4rem;
            font-weight: bold;
            transition: 0.3s;
            cursor: pointer;
        }

        .card-holder-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            max-width: 1350px;
            margin: 0px auto;
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            overflow: hidden;
        }

        .cardHolder {
            display: flex;
            flex-direction: column;
            justify-content: center;
            grid-column: span 3;
            gap: 2rem;
            align-items: flex-end;
            transform-origin: 92% center;
            scale: 1.2;
        }

        .cardHolder > button {
            height: 2rem;
        }

        .overlay {

        }
    `

    render() {
        return html`
            <div id="cardModal" class="modal">
                <div class="card-holder-container">
                    <div class="cardHolder">
                        <button @click="${this.unsetCurrentCard}">Terugzetten</button>
                        ${this._card}
                        <button @click="${this.requestDiscard}">Afleggen</button>
                    </div>
                </div>
                <div class="modal-overlay"></div>
            </div>
        `;
    }

}
