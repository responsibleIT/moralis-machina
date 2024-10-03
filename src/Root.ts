import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import './components/NavBar.ts'
import './components/Board.ts'
import {PlayerElement} from "./components/Player.ts";
import {SpecialType} from "./enums/SpecialType.ts";
import {ScenarioCardElement} from "./components/ScenarioCard.ts";
import {CardType} from "./enums/CardType.ts";
import {ScenarioType} from "./enums/ScenarioType.ts";
import {CurrentCardContainerElement} from './components/CurrentCardContainer.ts';
import {ScenarioCardDeckElement} from './components/ScenarioCardDeck.ts';
import {DiscardDeckElement} from './components/DiscardDeck.ts';

import scenarioCards from './assets/scenariocards.json'
import roleCards from './assets/rolecards.json'
import { RoleType } from './enums/RoleType.ts';
import { RoleCardElement } from './components/RoleCard.ts';

@customElement('root-element')
export class RootElement extends LitElement {

    initPlayers() {
        let players: Array<PlayerElement> = []
        for (let i = 0; i < 10; i++) {
            players.push(new PlayerElement(
                `Player ${i}`,
                SpecialType.Normaal,
            ))
        }

        let traitorIndex = Math.floor(Math.random() * players.length)
        players[traitorIndex].role = SpecialType.Dissident

        let leaderIndex = Math.floor(Math.random() * players.length)
        while (leaderIndex === traitorIndex) {
            leaderIndex = Math.floor(Math.random() * players.length)
        }
        players[leaderIndex].role = SpecialType.Redenaar


        return players
    }

    initDecks() {
        let redCards = new ScenarioCardDeckElement();
        let blueCards = new ScenarioCardDeckElement();
        let greenCards = new ScenarioCardDeckElement();
        let yellowCards = new ScenarioCardDeckElement();

        scenarioCards.forEach((card: any) => {
            switch (card.scenario) {
                case ScenarioType.RED:
                    redCards.push(new ScenarioCardElement(
                        card.name,
                        card.context,
                        `./card-images/${card.image}.webp`,
                        CardType.ScenarioCard,
                        ScenarioType.RED,
                        card.questions,
                        card.tags
                    ));
                    redCards.setDeckType = ScenarioType.RED;
                    break;
                case ScenarioType.BLUE:
                    blueCards.push(new ScenarioCardElement(
                        card.name,
                        card.context,
                        `./card-images/${card.image}.webp`,
                        CardType.ScenarioCard,
                        ScenarioType.BLUE,
                        card.questions,
                        card.tags
                    ));
                    blueCards.setDeckType = ScenarioType.BLUE;
                    break;
                case ScenarioType.GREEN:
                    greenCards.push(new ScenarioCardElement(
                        card.name,
                        card.context,
                        `./card-images/${card.image}.webp`,
                        CardType.ScenarioCard,
                        ScenarioType.GREEN,
                        card.questions,
                        card.tags
                    ));
                    greenCards.setDeckType = ScenarioType.GREEN;
                    break;
                case ScenarioType.YELLOW:
                    yellowCards.push(new ScenarioCardElement(
                        card.name,
                        card.context,
                        `./card-images/${card.image}.webp`,
                        CardType.ScenarioCard,
                        ScenarioType.YELLOW,
                        card.questions,
                        card.tags
                    ));
                    yellowCards.setDeckType = ScenarioType.YELLOW;
                    break;
            }
        });

        return [yellowCards, blueCards, greenCards, redCards];

    }

    initRoleCards() {
        let roleCardArray = new Array<RoleCardElement>

        roleCards.forEach((card: any) => {
            switch (card.name) {
                case RoleType.BLUE:
                   let blueCard = new RoleCardElement(
                        card.name,
                        card.context,
                        card.image,
                        RoleType.BLUE,
                        CardType.RoleCard)
                    roleCardArray.push(blueCard)
                    break;
                case RoleType.RED:
                    let redCard = new RoleCardElement(
                        card.name,
                        card.context,
                        card.image,
                        RoleType.RED,
                        CardType.RoleCard)                    
                        roleCardArray.push(redCard)
                    break;
                case RoleType.GREEN:
                    let greenCard = new RoleCardElement(
                        card.name,
                        card.context,
                        card.image,
                        RoleType.GREEN,
                        CardType.RoleCard)
                        roleCardArray.push(greenCard)
                    break;
                case RoleType.YELLOW:
                    let yellowCard = new RoleCardElement(
                        card.name,
                        card.context,
                        card.image,
                        RoleType.YELLOW,
                        CardType.RoleCard)
                        roleCardArray.push(yellowCard)
                    break;
            }
        });
        return roleCardArray
    }

    initCurrentCardContainer() {
        let currentCardContainer = new CurrentCardContainerElement();
        return currentCardContainer;
    }

    initDiscardPile() {
        let discardPile = new DiscardDeckElement();
        return discardPile;
    }

    connectedCallback() {
        super.connectedCallback()

    }

    render() {
        return html`
            <navbar-element></navbar-element>
            <board-element ._players=${this.initPlayers()} ._roleCards=${this.initRoleCards()} ._cardDecks=${this.initDecks()} ._currentCardContainer=${this.initCurrentCardContainer()} ._discardPile=${this.initDiscardPile()}></board-element>
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
