import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { ScenarioCardElement } from './ScenarioCard'
import { RoleCardElement } from './RoleCard.ts'
import { DeckElement } from './Decks'
import { SpecialCardElement } from './SpecialCard.ts'


@customElement('board-element')
export class BoardElement extends LitElement{
    private readonly _cardDecks: Array<DeckElement> = []
    private readonly _players: Array<{"name": string, "card": SpecialCardElement | undefined}> = []
    private readonly _roleCards: Array<RoleCardElement> = []
    private readonly _specialCards: Array<ScenarioCardElement> = []


    constructor(decks: Array<DeckElement>, players: Array<{"name": string, "card": SpecialCardElement | undefined}>, roleCards: Array<RoleCardElement>, specialCards: Array<ScenarioCardElement>) {
        super();
        this._cardDecks = decks;
        this._players = players;
        this._roleCards = roleCards;
        this._specialCards = specialCards;
    }

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
