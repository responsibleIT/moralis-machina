import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {ScenarioCardElement} from './ScenarioCard'
import {RoleCardElement} from './RoleCard'
import {SpecialCardElement} from './SpecialCard.ts'
import {ScenarioCardDeckElement} from './ScenarioCardDeck.ts'
import {DiscardDeckElement} from './DiscardDeck.ts'

@customElement('board-element')
export class BoardElement extends LitElement {
    @property({type: Array<ScenarioCardDeckElement>})
    private _cardDecks: Array<ScenarioCardDeckElement>

    @property({type: DiscardDeckElement})
    private _discardPile: DiscardDeckElement

    @property({type: Array<RoleCardElement>})
    private _roleCards

    @property({type: Array<SpecialCardElement>})
    private _specialCards

    constructor(decks: Array<ScenarioCardDeckElement>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>, discardPile: DiscardDeckElement) {
        super();
        this._cardDecks = decks;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
        this._discardPile = discardPile;
    }

    //Getters for the private properties
    public get getDecks(): Array<ScenarioCardDeckElement> {
        return this._cardDecks;
    }

    public get getRoleCards(): Array<RoleCardElement> {
        return this._roleCards;
    }

    public get getSpecialCards(): Array<SpecialCardElement> {
        return this._specialCards;
    }

    connectedCallback() {
        super.connectedCallback();

        // @ts-ignore
        this.addEventListener('request-unset-current-card', this.unsetCurrentCard)
        // @ts-ignore
        this.addEventListener('request-discard', this.discardCurrentCard)
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        // @ts-ignore
        this.removeEventListener('request-unset-current-card', this.unsetCurrentCard);
        // @ts-ignore
        this.removeEventListener('request-discard', this.discardCurrentCard)
    }

    private returnCard() {
        let card = this._discardPile.draw() as ScenarioCardElement;
        card.classList.remove("discard-card");
        let deck = this._cardDecks.find(deck => deck.getDeckType === card.getScenarioType) as ScenarioCardDeckElement;
        deck?.push(card);
        this.requestUpdate();
    }

    private discardCurrentCard(event: CustomEvent) {
        let card = event.detail.card as ScenarioCardElement;
        this._discardPile.push(card);
        this.requestUpdate();
    }
    
    render() {
        return html`
            <section class="board">
                <section class="decks-container">
                    ${this._cardDecks.map(deck => html`
                        <div class="single-deck-container">${deck}</div>`)}
                </section>
                <section class="role-cards-container">
                    ${this._roleCards.map(card => html`
                    <div class="card-container">${card}</div>`)}
                </section>
                <section class="side">
                    <section class="special-cards-container">
                        ${this._specialCards.map(card => html`
                        <div class="card-container">${card}</div>`)}
                    </section>
                    <div class="discard-pile">
                        <h3>Aflegstapel</h3>
                        <div @click="${this.returnCard}" class="discard-pile-deck">
                            ${this._discardPile.getCards.map((card, index) => html`
                            <div class="card-container" style="grid-area: 1/1/1/1; position: absolute; padding-top: ${20 * index /4}px; padding-left: ${20 * index /4}px;"> ${card}</div>`)}
                        </div>
                    </div>
                </section>
            </section>
            </div>
        `
    }

    static styles = css`
        .board {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: auto auto;
            gap: 2rem;
            width: 100%;
            min-height: 100vh;
            max-width: 140rem;
            margin: 0 auto;
        }

        .decks-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
            gap: 2rem;
            position: relative;
            grid-column: span 4;
            grid-row: 1;
            align-items: baseline;
            margin-top: 2rem;
            margin-left: .5rem;
        }

        .role-cards-container{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
            gap: 2rem;
            grid-column: span 4;
            grid-row: 2;
        }

        .side {
            grid-row: 1 / span 2;
            justify-content: space-between;
            display: flex;
            flex-direction: column;
        }

        .special-cards-container {
            position: relative;
            display: flex;
            justify-content: flex-end;
            column-gap: 0.5rem;
            margin-top: 2rem;
            z-index: 999;

            .card-container {
                height: fit-content;
                flex-shrink: 1
            }
        }

        .discard-pile {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 5rem;

            h3 {
                margin: auto;
                font-size: 2rem;
                font-weight: 100;
                text-align: center;
                color: #9f9f9f;
            }

            .discard-pile-deck {
                display: grid;
                border: 1px dashed rgb(248, 117, 97);
                min-height: 40rem;
                border-radius: 1rem;
                margin-bottom: 5rem;
                padding: .7rem 0 .7rem .7rem;
            }
        }
    `
}