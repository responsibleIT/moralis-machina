import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('current-card--container-element')
export class CurrentCardContainerElement extends LitElement {

    @state()
    private _card!: HTMLElement;

    @property({ type: Boolean })
    private _isDisplayed = false;

    @property({ type: Boolean })
    private _isFlipped = false;

    get card(): Node {
        return this._card;
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

    private requestDiscard() {
        const board = this.querySelector('.board');
        board?.dispatchEvent(new CustomEvent('request-discard', {
            detail: {
                card: this._card
            }
        }));
        this.toggleModalVisibility();
    }

    connectedCallback() {
        super.connectedCallback();
        console.log("Listening for request-set-current-card event")
        this.addEventListener('request-set-current-card', this.handleCurrentCardRequested);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('request-set-current-card', this.handleCurrentCardRequested);
    }

    private handleCurrentCardRequested(event) {
        console.log("Handling request-set-current-card event")
        this._card = event.detail.card
        this.toggleModalVisibility();
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
            font-size: 40px;
            font-weight: bold;
            transition: 0.3s;
        }
    `

    render() {
        return html`
            <div id="cardModal" class="modal">
                <span class="close" @click="${this.toggleModalVisibility}">&times;</span>
                <div class="cardHolder">
                    ${this._card}
                </div>
                <button @click="${this.requestDiscard}">Afleggen</button>
            </div>
        `;
    }

}