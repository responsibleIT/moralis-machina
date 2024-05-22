import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {ScenarioCardElement} from './ScenarioCard'
import {RoleCardElement} from './RoleCard'
import {SpecialCardElement} from './SpecialCard.ts'
import {PlayerElement} from "./Player.ts";
import {CurrentCardContainerElement} from "./CurrentCardContainer.ts";
import {RoleType} from "../enums/RoleType.ts";
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
        this._roleCards = [];
        this._specialCards = [];

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
        let deck = event.target as ScenarioCardDeckElement;
        let cardOnTop = deck?.draw();
        if (cardOnTop) {
            this._currentCardContainer.dispatchEvent(new CustomEvent('request-set-current-card', {
                bubbles: true,
                composed: true,
                detail: {
                    card: cardOnTop
                }
            }))
        } else {
            return;
        }
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
    }

    private discardCurrentCard(event: CustomEvent) {
        let card = event.detail.card as ScenarioCardElement;
        this._discardPile.push(card);
        if (!this._currentIsDiscarded) {
            this.shiftPlayerRoles();
        }
        this.requestUpdate();

        if (this._currentIsDiscarded) {
            this._currentIsDiscarded = false;
        }
    }

    private shiftPlayerRoles() {
        let allRolesInOrder: RoleType[] = []
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
        return html`
            <div class="board">
                <div class="players">
                    <h3>Spelers</h3>
                    ${this._players.map(player => html`
                        <div>${player}</div>`)}
                </div>
                <div class="decks">
                    <h3>Speelstapels</h3>
                    <div class="decks-container">
                        ${this._cardDecks.map(deck => html`
                            <div @click=${this.setCurrentCard}>${deck}</div>`)}
                    </div>
                </div>
                <div class="discard-pile">
                    <h3>Aflegstapel</h3>
                    ${this._discardPile.getCards.map(card => html`
                        <div @click=${this.setDiscardedCardAsCurrent}> ${card}</div>`)}
                </div>
            </div>
            ${this._currentCardContainer}
            </div>
        `
    }

    static styles = css`
        .board {
            display: flex;
            flex-direction: row;
            width: 100%;
            overflow: hidden;
        }

        .players {
            display: flex;
            flex-direction: column;
            width: 10%;
            border-right: 1px solid #e0e0e0;
            padding: 8px;
            margin: 8px;
        }

        .decks {
            display: flex;
            flex-direction: column;
            width: 70%;
            padding: 8px;
            margin: 8px;
        }

        .discard-pile {
            display: flex;
            flex-direction: column;
            width: 20%;
            padding: 8px;
            margin: 8px;
            border-left: 1px solid #e0e0e0;
        }

        .decks-container {
            display: flex;
            flex-wrap: wrap;
        }
    `
}
