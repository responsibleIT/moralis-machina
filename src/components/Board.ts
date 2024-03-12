import {css, html, LitElement} from 'lit'
import {customElement, property, query} from 'lit/decorators.js'
import {ScenarioCardElement} from './ScenarioCard'
import {RoleCardElement} from './RoleCard'
import {DeckElement} from './Deck'
import {SpecialCardElement} from './SpecialCard.ts'
import {PlayerElement} from "./Player.ts";
import {CurrentCardContainerElement} from "./CurrentCardContainerElement.ts";

@customElement('board-element')
export class BoardElement extends LitElement {
    @property({type: Array<DeckElement>})
    private _cardDecks: Array<DeckElement>

    @property({type: Array<ScenarioCardElement>})
    private _discardPile: Array<SpecialCardElement>

    @property()
    private _players: Array<PlayerElement>

    @property({type: Array<RoleCardElement>})
    private _roleCards

    @property({type: Array<SpecialCardElement>})
    private _specialCards

    @query('current-card-container-element')
    private _currentCardContainer: CurrentCardContainerElement

    constructor(decks: Array<DeckElement>, players: Array<PlayerElement>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>, currentCardContainer: CurrentCardContainerElement) {
        super();
        this._cardDecks = decks;
        this._players = players;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
        this._discardPile = [];
        this._currentCardContainer = currentCardContainer;
    }

    //Getters for the private properties
    public get getDecks(): Array<DeckElement> {
        return this._cardDecks;
    }

    public get getPlayers(): Array<PlayerElement> {
        return this._players;
    }

    public get getRoleCards(): Array<RoleCardElement> {
        return this._roleCards;
    }

    public get getSpecialCards(): Array<ScenarioCardElement> {
        return this._specialCards;
    }

    // Method to emit the custom event
    private requestSetCurrentCard(currentCard: Node) {
        console.log("Requesting to set current card");
        this.dispatchEvent(new CustomEvent('request-set-current-card', {
            bubbles: true, 
            composed: true,
            detail: {
                card: currentCard
            }
    }))};
    
    private selectCurrentCard(event: Event) {
        let deck = event.target as DeckElement;
        let cardOnTop = deck?.peek() as HTMLElement
        let clonedCard = cardOnTop.cloneNode(true)
        if (clonedCard) {
            //Fire an event that tells 
            this.requestSetCurrentCard(clonedCard);
        } else {
            console.log("Deck is empty");
            return;
        }
    }

    // private discardCurrentCard() {
    //     let card = this._currentCardContainer;
    //     if (card) {
    //         this._discardPile.push(card);
    //         this._currentCardContainer = undefined;
    //     }
    // }

    //Setters for the private properties
    // private set setDecks(decks: Array<DeckElement>) {
    //     this._mainDeck = decks;
    // }

    private assignSpecialCards(players: Array<{
        "name": string,
        "card": SpecialCardElement | undefined
    }>, deck: DeckElement) {
        //Assign a special card to each player until the deck is empty
        players.forEach(player => {
            player.card = deck?.draw()
        })
    }

    private removeSpecialCards(players: Array<{
        "name": string,
        "card": ScenarioCardElement | undefined
    }>, deck: DeckElement) {
        players.forEach(player => {
            deck?.push(player.card!)
            player.card = undefined
        })
    }

    connectedCallback() {
        super.connectedCallback();
        // init test decks red blue green yellow
        this._roleCards = [];
        this._specialCards = [];
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
                    ${this._discardPile.map(card => html`
                        <div>${card}</div>`)}
                </div>
                <div class="current-card">
                    ${this._currentCardContainer}
                </div>
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
