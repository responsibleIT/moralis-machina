import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ScenarioType } from '../enums/ScenarioType.ts';
import { DeckElement } from './Deck.ts';

@customElement('scenariocard-deck-element')
export class ScenarioCardDeckElement extends DeckElement {
    @property({type: ScenarioType})
    private _deckType: ScenarioType = ScenarioType.RED;

    static styles = css`
        .deck {
            display: grid;
        }

        scenario-card-element{
            grid-area: 1/1/1/1;
            width: 100%;
            position: relative;
            top: 0;
            left: 0;
            transition: top 0.5s ease-in-out, left 0.5s ease-in-out, transform 0.5s ease-in-out;

            &:nth-of-type(1) {
                padding-top: 0;
            }

            &:nth-of-type(2) {
                padding-top: 0.5rem;
            }

            &:nth-of-type(3) {
                padding-top: 1rem;
            }

            &:nth-of-type(4) {
                padding-top: 1.5rem;
            }
                
            &:nth-of-type(5) {
                padding-top: 2rem;
            }
        }

        .is-container-flipped {
            z-index: 999;
        }

        .flip-back {
            z-index: 999;
        }

        .deck-yellow .is-container-flipped {
            transform: translate(135%, 20%) scale(1.7);
            transform-origin: left;
        }

        .deck-blue .is-container-flipped {
            transform: translate(20%, 20%) scale(1.7);
            transform-origin: left;
        }

        .deck-green .is-container-flipped {
            transform: translate(-20%, 20%) scale(1.7);
            transform-origin: right;
        }

        .deck-red .is-container-flipped {
            transform: translate(-135%, 20%) scale(1.7);
            transform-origin: right;
        }

        .flip-to-discard {
            transform: translate(100%, 100%);
            z-index: 999;
        }
        
    `;

    public get getCards() {
        return this._cards;
    }

    public get getDeckType() {
        return this._deckType;
    }

    public set setDeckType(deckType: ScenarioType) {
        this._deckType = deckType;
    }

    connectedCallback() {
        super.connectedCallback();
        this.shuffle();
    }

    shuffle() {
        this._cards.sort(() => Math.random() - 0.5);
    }

    getDeckClass() {
        const scenarioType = this._cards.length > 0 ? this._cards[0].getScenarioType : null;

        switch (scenarioType) {
            case ScenarioType.YELLOW:
                return 'deck-yellow';
            case ScenarioType.BLUE:
                return 'deck-blue';
            case ScenarioType.GREEN:
                return 'deck-green';
            case ScenarioType.RED:
                return 'deck-red';
            default:
                return '';
        }
    }

    render() {
        return html`
            <div class="deck ${this.getDeckClass()}">
                ${this._cards.map(card => {
                    return html`${card}`;
                })}
            </div>
        `;
    } 
}
