import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { ScenarioCardElement } from './ScenarioCard'
import { RoleCardElement } from './RoleCard.ts'
import { DeckElement } from './Decks'
import { SpecialCardElement } from './SpecialCard.ts'

@customElement('board-element')
export class BoardElement extends LitElement{
    @property({type: Array<DeckElement>})
    private _cardDecks

    @property({type: Array<{"name": string, "card": SpecialCardElement | undefined}>})
    private readonly _players

    @property({type: Array<RoleCardElement>})
    private readonly _roleCards

    @property({type: Array<ScenarioCardElement>})
    private readonly _specialCards


    constructor(decks: Array<DeckElement>, players: Array<{"name": string, "card": SpecialCardElement | undefined}>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>) {
        super();
        this._cardDecks = decks;
        this._players = players;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
    }

    //Getters for the private properties
    public get getDecks(): Array<DeckElement> {
        return this._cardDecks;
    }

    public get getPlayers(): Array<{"name": string, "card": SpecialCardElement | undefined}> {
        return this._players;
    }

    public get getRoleCards(): Array<RoleCardElement> {
        return this._roleCards;
    }

    public get getSpecialCards(): Array<ScenarioCardElement> {
        return this._specialCards;
    }

    //Setters for the private properties
    private set setDecks(decks: Array<DeckElement>) {
        this._cardDecks = decks;
    }


    assignSpecialCards(players: Array<{"name": string, "card": SpecialCardElement | undefined}>, deck: DeckElement) {
        //Shuffle the deck
        deck?.shuffle()
        //Assign a special card to each player until the deck is empty
        players.forEach(player => {
            player.card = deck?.draw()
        })
    }

    removeSpecialCards(players: Array<{"name": string, "card": SpecialCardElement | undefined}>, deck: DeckElement) {
        players.forEach(player => {
            deck?.push(player.card)
            player.card = undefined
        })
    }

    render() {
        return html`
            
        `
    }

    static styles = css`
       
    `
}
