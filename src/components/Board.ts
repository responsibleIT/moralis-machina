import {css, html, LitElement} from 'lit'
import {customElement, property, query} from 'lit/decorators.js'
import {ScenarioCardElement} from './ScenarioCard'
import {RoleCardElement} from './RoleCard'
import {DeckElement} from './Deck'
import {SpecialCardElement} from './SpecialCard.ts'
import {PlayerElement} from "./Player.ts";
import {CurrentCardContainerElement} from "./CurrentCardContainer.ts";
import {RoleType} from "../enums/RoleType.ts";
import { ScenarioCardDeckElement } from './ScenarioCardDeck.ts'
import { DiscardDeckElement } from './DiscardDeck.ts'

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

    constructor(decks: Array<ScenarioCardDeckElement>, players: Array<PlayerElement>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>, currentCardContainer: CurrentCardContainerElement) {
        super();
        this._cardDecks = decks;
        this._players = players;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
        this._discardPile = new DiscardDeckElement();
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

    // Method to emit the custom event
    private requestSetCurrentCard(currentCard: Node) {
        console.log("Requesting to set current card");
        this._currentCardContainer.dispatchEvent(new CustomEvent('request-set-current-card', {
            bubbles: true,
            composed: true,
            detail: {
                card: currentCard
            }
        }))
    };

    private selectCurrentCard(event: Event) {
        let deck = event.target as ScenarioCardDeckElement;
        let cardOnTop = deck?.peek() as HTMLElement;
        if (cardOnTop) {
            this.requestSetCurrentCard(cardOnTop);
        } else {
            console.log("Deck is empty");
            return;
        }
    }

    private discardCurrentCard(event) {
        let card = event.detail.card as ScenarioCardElement;
        let deck = this._cardDecks.find(deck => deck.getDeckType === card.getScenarioType);
        this._discardPile.push(deck?.draw()!);
        this.shiftPlayerRoles();
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

    private returnCard(event) {
        let card = event.detail.card as ScenarioCardElement;
        let deck = this._cardDecks.find(deck => deck.getDeckType === card.getScenarioType);
        deck?.push(card);
    }
    
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('request-discard', this.discardCurrentCard)
        this.addEventListener('request-return-card', this.returnCard)
        // init test decks red blue green yellow
        this._roleCards = [];
        this._specialCards = [];
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('request-discard', this.discardCurrentCard);
        this.removeEventListener('request-return-card', this.returnCard);
    }

    render() {
        // console.log(this._players);
        return html`
            <div class="board">
                <div class="players">
                    <h3>Spelers</h3>
                    ${this._players.map(player => html`
                        <div>${player}</div>`)}
                </div>
                <div class="decks">
                    <h3>Speelstapels</h3>
                    ${this._cardDecks.map(deck => html`
                        <div @click=${this.selectCurrentCard}>${deck}</div>`)}
                </div>
                <div class="discard-pile">
                    <h3>Aflegstapel</h3>
                    <div>
                        ${this._discardPile}
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

    `
}
