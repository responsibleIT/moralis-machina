import {LitElement, css, CSSResultGroup} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { CardType } from '../enums/CardType'

@customElement('card-element')
export abstract class CardElement extends LitElement{
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

    protected flip() {
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
            width: 10rem;
            height: 16rem;
            padding: 16px;
            margin: 8px;
            position: relative;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            border-radius: 10px;
            box-shadow: 4px 8px 4px 0 rgba(0, 0, 0, 0.2);
        }

        .card-face {
            backface-visibility: hidden;
            height: 100%;
        }

        .card-front {
            display: flex;
            flex-direction: column;
        }

        .card-rear {
            display: flex;
            flex-direction: column;
            transform: rotateY(180deg);
        }

        .card img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .card-name {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 8px;
        }
        
        .is-flipped {
            transform: rotateY(180deg);
        }
        
    ` as CSSResultGroup
}
