import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import './components/NavBar.ts'
import './components/Board.ts'
import {PlayerElement} from "./components/Player.ts";
import {RoleType} from "./enums/RoleType.ts";
import {ScenarioCardElement} from "./components/ScenarioCard.ts";
import {CardType} from "./enums/CardType.ts";
import {ScenarioType} from "./enums/ScenarioType.ts";
import { CurrentCardContainerElement } from './components/CurrentCardContainer.ts';
import { ScenarioCardDeckElement } from './components/ScenarioCardDeck.ts';

@customElement('root-element')
export class RootElement extends LitElement {

    initPlayers() {
        console.log("init players")

        let players: Array<PlayerElement> = []
        for (let i = 0; i < 10; i++) {
            players.push(new PlayerElement(
                `Player ${i}`,
                RoleType.Normaal,
            ))
        }

        let traitorIndex = Math.floor(Math.random() * players.length)
        players[traitorIndex].role = RoleType.Dissident

        let leaderIndex = Math.floor(Math.random() * players.length)
        while (leaderIndex === traitorIndex) {
            leaderIndex = Math.floor(Math.random() * players.length)
        }
        players[leaderIndex].role = RoleType.Redenaar
        console.log(players)


        return players
    }

    initDecks() {
        console.log("Initializing decks...")
        // init test decks red blue green yellow
        let redCards = new ScenarioCardDeckElement();
        for (let i = 0; i < 5; i++) {
            const card = new ScenarioCardElement(
                "Test" + i,
                "Test" + i,
                "Test" + i,
                CardType.ScenarioCard,
                ScenarioType.RED,
                ["1", "2"],
                ["1", "2"]
            );
            redCards.push(card);
            redCards.setDeckType = ScenarioType.RED;
        }
        let blueCards = new ScenarioCardDeckElement();
        for (let i = 0; i < 5; i++) {
            const card = new ScenarioCardElement(
                "Test" + i,
                "Test" + i,
                "Test" + i,
                CardType.ScenarioCard,
                ScenarioType.BLUE,
                ["1", "2"],
                ["1", "2"]
            );
            blueCards.push(card);
            blueCards.setDeckType = ScenarioType.BLUE;
        }
        let greenCards = new ScenarioCardDeckElement();
        for (let i = 0; i < 5; i++) {
            const card = new ScenarioCardElement(
                "Test" + i,
                "Test" + i,
                "Test" + i,
                CardType.ScenarioCard,
                ScenarioType.GREEN,
                ["1", "2"],
                ["1", "2"]
            );
            greenCards.push(card);
            greenCards.setDeckType = ScenarioType.GREEN;
        }
        let yellowCards = new ScenarioCardDeckElement();
        for (let i = 0; i < 5; i++) {
            const card = new ScenarioCardElement(
                "Test" + i,
                "Test" + i,
                "Test" + i,
                CardType.ScenarioCard,
                ScenarioType.YELLOW,
                ["1", "2"],
                ["1", "2"]
            );
            yellowCards.push(card);
            yellowCards.setDeckType = ScenarioType.YELLOW;
        }

        return [redCards, blueCards, greenCards, yellowCards];
    }

    initCurrentCardContainer() {
        console.log("Initializing current card container...")
        let currentCardContainer = new CurrentCardContainerElement();
        return currentCardContainer;
    }

    connectedCallback() {
        super.connectedCallback()

    }

    render() {
        return html`
            <navbar-element></navbar-element>
            <board-element ._players=${this.initPlayers()} ._cardDecks=${this.initDecks()} ._currentCardContainer=${this.initCurrentCardContainer()}></board-element>
        `;
    }


    static styles = css`

    `
}

declare global {
    interface HTMLElementTagNameMap {
        'root-element': RootElement
    }
}
