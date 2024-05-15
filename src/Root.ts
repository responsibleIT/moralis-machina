import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import './components/NavBar.ts'
import './components/Board.ts'
import {PlayerElement} from "./components/Player.ts";
import {RoleType} from "./enums/RoleType.ts";
import {ScenarioCardElement} from "./components/ScenarioCard.ts";
import {CardType} from "./enums/CardType.ts";
import {ScenarioType} from "./enums/ScenarioType.ts";
import {CurrentCardContainerElement} from './components/CurrentCardContainer.ts';
import {ScenarioCardDeckElement} from './components/ScenarioCardDeck.ts';
import {DiscardDeckElement} from './components/DiscardDeck.ts';

import scenarioCards from './assets/scenariocards.json'

@customElement('root-element')
export class RootElement extends LitElement {

    initPlayers() {
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
                        `./src/assets/card-images/${card.image}.png`,
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
                        `./src/assets/card-images/${card.image}.png`,
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
                        `./src/assets/card-images/${card.image}.png`,
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
                        `./src/assets/card-images/${card.image}.png`,
                        CardType.ScenarioCard,
                        ScenarioType.YELLOW,
                        card.questions,
                        card.tags
                    ));
                    yellowCards.setDeckType = ScenarioType.YELLOW;
                    break;
            }
        });

        return [redCards, blueCards, greenCards, yellowCards];
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
            <board-element ._players=${this.initPlayers()} ._cardDecks=${this.initDecks()} ._currentCardContainer=${this.initCurrentCardContainer()} ._discardPile=${this.initDiscardPile()}></board-element>
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
