import {LitElement, css, CSSResultGroup} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {CardType} from '../enums/CardType'

@customElement('card-element')
export abstract class CardElement extends LitElement {
    @property({type: String})
    protected readonly cardName

    @property({type: String})
    protected readonly context

    @property({type: String})
    protected readonly image

    @property({type: CardType})
    protected readonly cardType

    @property({type: Boolean})
    protected _isFlipped = false

    protected constructor(cardName: string, context: string, image: string, cardType: CardType) {
        super();
        this.cardName = cardName;
        this.context = context;
        this.image = image;
        this.cardType = cardType;
    }

    public flip() {
        this._isFlipped = !this._isFlipped;

        const card = this.shadowRoot?.querySelector('.card') as HTMLElement
        card.classList.toggle('is-flipped');
    }

    //Getters for the private properties
    public get getCardName(): string {
        return this.cardName;
    }

    public get getContext(): string {
        return this.context;
    }

    public get getImage(): string {
        return this.image;
    }

    public get getCardType(): CardType {
        return this.cardType;
    }

    public get getIsFlipped(): boolean {
        return this._isFlipped;
    }

    static styles = css`
        .card-outer {
            perspective: 1000px;
        }

        .card {
            display: flex;
            flex-direction: column;
            width: 13rem;
            height: 20rem;
            padding: 16px;
            margin: 8px;
            position: relative;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            border-radius: 4px;
            box-shadow: 4px 8px 4px 0 rgba(0, 0, 0, 0.2);
            border: 1px solid black;
        }

        .card-face {
            backface-visibility: hidden;
            height: 100%;
        }

        .card-front {
            display: flex;
            flex-direction: column;
            font-family: "Abril Fatface", serif;
        }

        .card-rear {
            display: flex;
            flex-direction: column;
            transform: rotateY(180deg);
            font-family: "Roboto", sans-serif;
            width: 100%;
            height: 100%;
        }

        .card-rear > .rear-name {
            font-weight: bold;
            font-size: 1.2rem;
            padding-bottom: 0.5em;
            margin-left: auto;
            margin-right: auto;
            width: 80%;
            text-align: center;
        }

        .card-rear > .rear-context {
            font-size: 0.8rem;
        }

        .card-rear > .rear-hr {
            width: 80%;
            height: 0;
            border: 0.01em solid black;
            margin: 0.5em auto;
        }
        
        .question-container > .rear-question1 {
            font-size: 0.9rem;
            padding-bottom: 1em;
        }

        .question-container > .rear-question2 {
            font-size: 0.9rem;
        }
        
        .question-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 1em;
        }
        
        .card-rear > .filler {
            flex-grow: 1;
        }
        
        .tag-container > .rear-tag1 {
            font-size: 0.5rem;
            padding-right: 0.5em;
        }

        .tag-container > .rear-tag2 {
            font-size: 0.5rem;
        }
        
        .tag-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        .card img {
            width: 14em;
            height: 14em;
            object-fit: contain;
            padding-bottom: 2em;
        }

        .card-name {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 8px;
        }

        .is-flipped {
            transform: rotateY(180deg);

            .card-front {
                display: none;
            }
        }

        .flip-button {
            position: absolute;
            width: 18%;
            height: 12%;
            top: 0;
            right: 0;
            background-image: linear-gradient(to bottom left, black, black 50%, transparent 50%, transparent);
            color: white;
            font-size: 1rem;
            cursor: pointer;
            z-index: 10;
        }

    ` as CSSResultGroup
}
