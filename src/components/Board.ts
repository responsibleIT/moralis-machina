import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {ScenarioCardElement} from './ScenarioCard'
import {RoleCardElement} from './RoleCard'
import {DeckElement} from './Deck'
import {SpecialCardElement} from './SpecialCard.ts'
import {CardElement} from './Card.ts'

@customElement('board-element')
export class BoardElement extends LitElement {
    @property({type: Array<DeckElement>})
    private readonly _cardDecks: Array<DeckElement>

    @property({type: Array<ScenarioCardElement>})
    private readonly _discardPile: Array<SpecialCardElement>

    @property({type: Array<{ "name": string, "card": SpecialCardElement | undefined }>})
    private readonly _players

    @property({type: Array<RoleCardElement>})
    private readonly _roleCards

    @property({type: Array<SpecialCardElement>})
    private readonly _specialCards

    @property({type: ScenarioCardElement})
    private _currentCard: ScenarioCardElement | undefined

    constructor(decks: Array<DeckElement>, players: Array<{
        "name": string,
        "card": SpecialCardElement | undefined
    }>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>) {
        super();
        this._cardDecks = decks;
        this._players = players;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
        this._discardPile = [];
        this._currentCard = undefined;
    }

    //Getters for the private properties
    public get getDecks(): Array<DeckElement> {
        return this._cardDecks;
    }

    public get getPlayers(): Array<{ "name": string, "card": SpecialCardElement | undefined }> {
        return this._players;
    }

    public get getRoleCards(): Array<RoleCardElement> {
        return this._roleCards;
    }

    public get getSpecialCards(): Array<ScenarioCardElement> {
        return this._specialCards;
    }

    public setCurrentCard(card: ScenarioCardElement) {
        this._currentCard = card;
    }

    public discardCurrentCard() {
        let card = this._currentCard;
        if (card) {
            this._discardPile.push(card);
            this._currentCard = undefined;
        }
    }

    //Setters for the private properties
    // private set setDecks(decks: Array<DeckElement>) {
    //     this._mainDeck = decks;
    // }

    assignSpecialCards(players: Array<{
        "name": string,
        "card": SpecialCardElement | undefined
    }>, deck: DeckElement) {
        //Assign a special card to each player until the deck is empty
        players.forEach(player => {
            player.card = deck?.draw()
        })
    }

    removeSpecialCards(players: Array<{
        "name": string,
        "card": SpecialCardElement | undefined
    }>, deck: DeckElement) {
        players.forEach(player => {
            deck?.push(player.card!)
            player.card = undefined
        })
    }

    render() {
        return html`
            <div class="board">
                <div class="decks">
                    ${this._cardDecks.map(deck => html`
                        <div>${deck}</div>`)}
                </div>
                <div class="players">
                    ${this._players.map(player => html`
                        <div>${player.name}</div>`)}
                </div>
                <div class="role-cards">
                    ${this._roleCards.map(roleCard => html`
                        <div>${roleCard}</div>`)}
                </div>
                <div class="special-cards">
                    ${this._specialCards.map(specialCard => html`
                        <div>${specialCard}</div>`)}
                </div>
            </div>
        `
    }

    static styles = css`

    `
}
