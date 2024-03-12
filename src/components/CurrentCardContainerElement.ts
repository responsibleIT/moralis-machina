import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('current-card--container-element')
export class CurrentCardContainerElement extends LitElement {

    @property({ type: Node })
    private _card!: Node;

    @property({ type: Boolean })
    private _isVisible = false;

    @property({ type: Boolean })
    private _isFlipped = false;

    @query('.cardHolder')
    private _cardHolder!: HTMLElement;

    get card(): Node {
        return this._card;
    }

    set card(value: Node) {
        this._card = value;
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(value: boolean) {
        this._isVisible = value;
    }

    get isFlipped(): boolean {
        return this._isFlipped;
    }

    set isFlipped(value: boolean) {
        this._isFlipped = value;
    }

    private modalIsVisible(isVisible: boolean) {
        this._isVisible = isVisible;

        let cardModal = this.shadowRoot?.getElementById('cardModal') as HTMLElement;
        cardModal.style.display = isVisible ? "flex" : "none";
    }

    connectedCallback() {
        console.log("Listening for request-set-current-card event")
        this.addEventListener('request-set-current-card', this.handleCurrentCardRequested);
    }

    disconnectedCallback() {
        this.removeEventListener('request-set-current-card', this.handleCurrentCardRequested);
    }

    private handleCurrentCardRequested(event) {
        this.card = event.detail;
        this._cardHolder.appendChild(this.card);
        this.modalIsVisible(true);
    }

    static styles = css`
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
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
                <span class="close" @click="${this.modalIsVisible(false)}">&times;</span>
                <div class="cardHolder"></div>
                <button>Afleggen</button>
            </div>
        `;
    }

}