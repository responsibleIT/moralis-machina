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
        if (!card) return;
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

    private shuffle(deckIndex: number) {
        let deck = this._cardDecks[deckIndex];
        let cards = [...deck._cards];
        
        let shuffleableCards = cards.filter(card => !card.classList.contains('discard-card'));
        shuffleableCards.push(shuffleableCards.shift()!);
    
        deck._cards = cards.map(card => card.classList.contains('discard-card') ? card : shuffleableCards.shift()!);
        deck.requestUpdate();
    }
    
    render() {
        return html`
            <section class="board">
                <section class="decks-container">
                    ${this._cardDecks.map((deck, index) => html`
                        <div class="single-deck-container">${deck}
                            <svg class="shuffle-icon" @click=${() => this.shuffle(index)} width="30" height="30" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.5231 26.1952L29.2915 20.891C21.7983 12.2715 10.8992 7.63032 0 7.63032V14.2606C8.85556 14.2606 17.7111 18.2388 23.8419 24.8692L24.5231 26.1952ZM75.6129 57.3577C67.4385 57.3577 59.9454 54.0426 53.8146 48.7383L49.7274 54.0426C56.5394 60.6729 66.0761 63.988 75.6129 63.988V73.9335L99.4548 60.6729L75.6129 47.4122V57.3577ZM75.6129 17.5758V27.5213L99.4548 14.2606L75.6129 1V10.9455C64.7137 10.9455 53.8146 15.5867 47.0026 24.2061L23.8419 50.0644C17.7111 56.6947 8.85556 60.6729 0 60.6729V67.3032C10.8992 67.3032 21.7983 62.662 28.6103 54.0426L51.771 28.1843C57.9018 21.554 66.7573 17.5758 75.6129 17.5758Z" fill="black"/>
                            </svg>
                        </div>`)}
                </section>
                <section class="role-cards-container">
                    ${this._roleCards.map(card => html`
                    <div class="card-container">${card}</div>`)}
                </section>
                <section class="special-cards-container">
                    ${this._specialCards.map(card => html`
                    ${card}`)}
                </section>
                <div class="discard-pile">
                    <h3>Aflegstapel</h3>
                    <div class="discard-pile-deck" @click="${this.returnCard}">
                        ${this._discardPile.getCards.map((card, index) => html`
                    <div class="card-container" style="grid-area: 1/1/1/1; position: absolute; padding-top: ${20 * index /4}px; padding-left: ${20 * index /4}px;"> ${card}</div>`)}
                    </div>
                </div>
            </section>
        `
    }

    static styles = css`
        .board {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: auto auto;
            min-height: 80vh;
            max-width: 140rem;
            gap: 2rem;
            width: 100%;
            margin: 0 auto;
        }

        .decks-container {
            position: relative;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
            grid-column: span 4;
            grid-row: 1;
            gap: 2rem;
            align-items: baseline;
            min-height: 50vh;
            margin-top: 2rem;
        }

        .single-deck-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            svg.shuffle-icon {
                cursor: pointer;

                path {
                    fill: #f1ded4;
                    stroke: #000000;
                    stroke-width: .3rem;
                    transition: 0.25s ease-in-out;
                }
                &:hover path{
                    fill: #000000;
                }
            }
        }

        .role-cards-container{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
            gap: 2rem;
            grid-column: span 4;
            grid-row: 2;
            min-height: 40vh;
            margin-bottom: 5rem;
        }

        .special-cards-container {
            height: 40rem;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            margin-top: 2rem;
            // z-index: 999;
            grid-column: span 1;
            grid-row: 1;
        }

        .discard-pile {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 5rem;
            grid-column: span 1;
            grid-row: 2;

            h3 {
                font-family: "casus", serif;
                font-size: 2rem;
                font-weight: 100;
                text-transform: uppercase;
                text-align: center;
                color: #9f9f9f;
                margin: auto;
            }

            .discard-pile-deck {
                display: grid;
                border: 1px dashed #F87561;
                min-height: 40rem;
                border-radius: 1rem;
                margin-bottom: 5rem;
                padding: .7rem 0 .7rem .7rem;
            }
        }
    `
}