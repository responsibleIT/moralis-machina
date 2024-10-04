import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {ScenarioCardElement} from './ScenarioCard'
import {RoleCardElement} from './RoleCard'
import {SpecialCardElement} from './SpecialCard.ts'
import {PlayerElement} from "./Player.ts";
import {CurrentCardContainerElement} from "./CurrentCardContainer.ts";
import {SpecialType} from "../enums/SpecialType.ts";
import {ScenarioCardDeckElement} from './ScenarioCardDeck.ts'
import {DiscardDeckElement} from './DiscardDeck.ts'

@customElement('board-element')
export class BoardElement extends LitElement {
    @property({type: Array<ScenarioCardDeckElement>})
    private _cardDecks: Array<ScenarioCardDeckElement>

    @property({type: DiscardDeckElement})
    private _discardPile: DiscardDeckElement

    @property()
    private _players: Array<PlayerElement>

    @property({type: Array<RoleCardElement>})
    private _roleCards

    @property({type: Array<SpecialCardElement>})
    private _specialCards

    @property({type: CurrentCardContainerElement})
    private _currentCardContainer: CurrentCardContainerElement

    private _currentIsDiscarded = false;

    constructor(decks: Array<ScenarioCardDeckElement>, players: Array<PlayerElement>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>, currentCardContainer: CurrentCardContainerElement, discardPile: DiscardDeckElement) {
        super();
        this._cardDecks = decks;
        this._players = players;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
        this._discardPile = discardPile;
        this._currentCardContainer = currentCardContainer;
    }

    //Getters for the private properties
    public get getDecks(): Array<ScenarioCardDeckElement> {
        return this._cardDecks;
    }

    public get getPlayers(): Array<PlayerElement> {
        return this._players;
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

    private setCurrentCard(event: CustomEvent) {
        // let deck = event.target as ScenarioCardDeckElement;
        // let cardOnTop = deck?.draw();
        // if (cardOnTop) {
        //     this._currentCardContainer.dispatchEvent(new CustomEvent('request-set-current-card', {
        //         bubbles: true,
        //         composed: true,
        //         detail: {
        //             card: cardOnTop
        //         }
        //     }))
        // } else {
        //     return;
        // }
    }

    private setDiscardedCardAsCurrent(event: CustomEvent) {
        let card = event.target
        this._currentCardContainer.dispatchEvent(new CustomEvent('request-set-current-card', {
            bubbles: true,
            composed: true,
            detail: {
                card: card
            }
        }))

        this._currentIsDiscarded = true;
    }

    private unsetCurrentCard(event: CustomEvent) {
        let card = event.detail.card as ScenarioCardElement;
        let deck = this._cardDecks.find(deck => deck.getDeckType === card.getScenarioType) as ScenarioCardDeckElement;
        deck?.push(card);
        this.requestUpdate();

        this._currentIsDiscarded = false;
    }

    private discardCurrentCard(event: CustomEvent) {
        let card = event.detail.card as ScenarioCardElement;
        this._discardPile.push(card);
        if (!this._currentIsDiscarded) {
            this.shiftPlayerRoles();
        }
        this.requestUpdate();

        this._currentIsDiscarded = false;
    }

    private shiftPlayerRoles() {
        let allRolesInOrder: SpecialType[] = []
        this._players.forEach(player => {
            allRolesInOrder.push(player.role)
        })

        // shift roles one to the right
        let lastRole = allRolesInOrder.pop()
        allRolesInOrder.unshift(lastRole!)

        // update roles
        this._players.forEach((player, index) => {
            player.role = allRolesInOrder[index]
        })
    }
    

    render() {
        console.log(this._roleCards);
        return html`
            <section class="board">
                <!-- <div class="players">
                    <h3>Spelers</h3>
                    ${this._players.map(player => html`
                        <div>${player}</div>`)}
                </div> -->
                <section class="decks-container">
                    ${this._cardDecks.map(deck => html`
                        <div class="single-deck-container" @click=${this.setCurrentCard}>${deck}</div>`)}
                </section>
                <section class="role-cards-container">
                        ${this._roleCards.map(card => html`
                        <div class="card-container">${card}</div>`)}
                </section>
                <div class="discard-pile">
                    <h3>Aflegstapel</h3>
                    <div class="discard-pile-deck">
                        ${this._discardPile.getCards.map((card, index) => html`
                        <div @click=${this.setDiscardedCardAsCurrent} style="grid-area: 1/1/1/1; padding-top: ${20 * index /4}px;"> ${card}</div>`)}
                    </div>
                </div>
            </section>
            ${this._currentCardContainer}
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
            min-height: 80vh;
            overflow: hidden;
            max-width: 1350px;
            margin: 0 auto;
        }

        .players {
            display: flex;
            flex-direction: column;
            width: 10%;
            border-right: 1px solid #e0e0e0;
            padding: 0.8rem;
            margin: 0.8rem;
        }

        .decks {
        }

        .role-cards-container{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
            gap: 2rem;
            grid-column: span 4;
            grid-row: 2;
            // border-top: 1px solid #ccc;
            padding-top: 2rem;
        }

        .discard-pile {
            display: flex;
            flex-direction: column;
            grid-column: span 1;
            gap: 3rem;
            padding-top: 2rem;
            overflow-y: scroll;
            border-left: 1px solid #cccccc;
        }

        .discard-pile h3 {
            margin: 0;
            padding: 0rem 3rem 0rem 2rem;
            font-size: 2rem;
            font-weight: 100;
            text-transform: math-auto;
            color: #9f9f9f;
        }

        .discard-pile-deck {
            display: grid;
            margin: 0rem 0rem 0rem 2rem;
        }

        .decks-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
            gap: 2rem;
            position: relative;
            grid-column: span 4;
            grid-row: 1;
            align-items: center;
            margin-top: 5rem;
            margin-left: .5rem;
        }

        .single-deck-container {
            position: relative;
        }

    `
}