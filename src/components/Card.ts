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
    
        const cardContainer = this.closest('.card-container') as HTMLElement;
        if (cardContainer) {
            cardContainer.classList.toggle('is-container-flipped');
        }
        const card = this.shadowRoot?.querySelector('.card') as HTMLElement;
        card.classList.toggle('is-flipped');
    
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!card.contains(target) && target !== card) {
                this._isFlipped = !this._isFlipped;
                card.classList.toggle('is-flipped');
                if (cardContainer) {
                    cardContainer.classList.toggle('is-container-flipped');
                }
                document.removeEventListener('click', handleClickOutside);
            }
        };
    
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);
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
            perspective: 100rem;
            height: 100%
        }

        .card {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 25rem;
            height: 40rem;
            // padding: 1.6rem;
            // margin: 0.8rem;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.25s ease-in-out, top 0.25s ease-in-out, left 0.25s ease-in-out;
            cursor: pointer;
            border-radius: 1rem;
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2), 0px -2px 5px rgba(0, 0, 0, 0.2);
            // box-shadow: 0.4rem 0.8rem 0.4rem 0 rgba(0, 0, 0, 0.2);
            // border: 1px solid black;
        }

        .card-face {
            backface-visibility: hidden;
            height: 100%;
        }

        .card-front {
            display: flex;
            flex-direction: column;
            font-family: "Como", serif;
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            justify-content: center;
            align-items: center;
        }

        .card-back {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            transform: rotateY(180deg);
            font-family: "Roboto", sans-serif;
            height: 100%;
            padding: 2rem;
            // border: solid 2px;
            border-radius: 1rem;
            // background-color: #ffffff;
        }

        .card-back > .rear-name {
            font-family: "Como", sans-serif;
            font-weight: bold;
            font-size: 2rem;
            padding-bottom: 0.5rem;
            margin: 0 auto;
            text-align: center;
        }

        .card-back > .rear-context {
            font-size: 1.5rem;
        }

        .card-back > .rear-hr {
            width: 80%;
            height: 0;
            border: 0.01em solid black;
            margin: 0.5rem auto;
        }
        
        .question-container > .rear-question1 {
            font-size: 1.3rem;
            padding-bottom: 1rem;
        }

        .question-container > .rear-question2 {
            font-size: 1.3rem;
        }
        
        .question-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 1rem;
        }
        
        .card-back > .filler {
            flex-grow: 1;
        }
        
        .tag-container > .rear-tag1 {
            font-size: 1rem;
        }

        .tag-container > .rear-tag2 {
            font-size: 1rem;
        }
        
        .tag-container {
            display: flex;
            flex-flow: wrap;
            justify-content: flex-end;
            gap: 0.5rem;
        }

        .card img {
            width: 100%;
            height: 20rem;
            object-fit: contain;
            pointer-events: none;
            user-select: none;
            // padding-bottom: 2rem;
        }

        .card-name {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            margin-top: 0.8rem;
        }

        .is-flipped {
            // transition: 2s ease-in-out;
            // transform: rotateY(-180deg);
            // transform: translate(50%, 10px) rotateY(-180deg);
            // transform: translate(50%, 30px) rotateY(-180deg) scale(1.2);
            transform: rotateY(-180deg);
        }

        .flip-button {
            // position: absolute;
            // width: 18%;
            // height: 12%;
            // top: 0;
            // right: 0;
            // background-image: linear-gradient(to bottom left, black, black 50%, transparent 50%, transparent);
            // color: white;
            // font-size: 1rem;
            // cursor: pointer;
            // z-index: 10;
            background: none;
            border: none;
        }

        .card-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
            
        .card-button:hover {
            background-color: #0056b3;
        }

        .role-card {
            cursor: unset;
        }

    ` as CSSResultGroup
}
