import {LitElement, css, html} from 'lit'
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

    public get getIsFlipped(): boolean {
        return this._isFlipped;
    }

    public get getCardType(): CardType {
        return this.cardType;
    }

    protected flip() {
        this._isFlipped = !this._isFlipped;

        const front = this.shadowRoot?.querySelector('.card-front') as HTMLElement
        const rear = this.shadowRoot?.querySelector('.card-rear') as HTMLElement

        if (this._isFlipped) {
            front.style.display = 'none'
            rear.style.display = 'flex'
        } else {
            front.style.display = 'flex'
            rear.style.display = 'none'
        }
    }

    static styles = css`
        .card {
            display: flex;
            flex-direction: column;
            width: 10rem;
            height: 16rem;
            padding: 16px;
            margin: 8px;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }

        .card-front {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .card-rear {
            display: none;
            flex-direction: column;
            height: 100%;
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
    `
}
