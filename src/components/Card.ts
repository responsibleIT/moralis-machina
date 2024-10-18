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
        if (this.classList.contains("discard-card")) return;
    
        this._isFlipped = !this._isFlipped;
        const body = document.querySelector('body') as HTMLElement;
        const cardContainer = this.closest('scenario-card-element') as HTMLElement;
        const card = this.shadowRoot?.querySelector('.card') as HTMLElement;
    
        cardContainer?.classList.toggle('is-container-flipped');
        card?.classList.toggle('is-flipped');
        body.classList.toggle('overlay-active');
    
        const handleClickOutside = (event: MouseEvent) => {
            const path = event.composedPath();
            const clickedOnSpecialCard = path.some(el => (el as HTMLElement).classList?.contains('special-card'));
    
            if (path.includes(card) || (!clickedOnSpecialCard && !path.includes(card))) {
                this._isFlipped = !this._isFlipped;
                card?.classList.toggle('is-flipped');
                body.classList.toggle('overlay-active');
                cardContainer?.classList.toggle('is-container-flipped');
                document.removeEventListener('click', handleClickOutside);
            }
        };
    
        setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
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
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2), -1px -1px 5px rgba(0, 0, 0, 0.2);
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
            // font-family: "Roboto", sans-serif;
            font-family: "Open Sans", sans-serif;
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
            font-size: 1.2rem;
            line-height: 1.2;
        }

        .card-back > .rear-hr {
            width: 80%;
            height: 0;
            border: 0.01em solid black;
            margin: 0.5rem auto;
        }
        
        .question-container > .rear-question1{
            padding-bottom: 1rem;
        }

        .question-container > .rear-question1, .question-container > .rear-question2   {
            font-size: 1.2rem;
            line-height: 1.2;
        }
        
        .question-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // padding-top: 1rem;
        }
        
        .card-back > .filler {
            flex-grow: 1;
        }
        
        .tag-container > .rear-tag1, .tag-container > .rear-tag2 {
            font-size: 1rem;
            text-transform: uppercase;
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

        .card-yellow .is-flipped, .card-blue .is-flipped{
            transform: rotateY(-180deg);
        }

        .card-green .is-flipped, .card-red .is-flipped{
            transform: rotateY(180deg);
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
            align-self: flex-end;
            font-family: "Open Sans", sans-serif;
            text-transform: uppercase;
            width: fit-content;
            background: #333333;
            border: 1px solid #000;
            color: #ffffff;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: 0.25s ease-in-out;
        }
            
        .card-button:hover {
            background: none;
            color: #000000;
        }

        .role-card {
            height: 35rem;
            cursor: unset;
            border: none;
            box-shadow: none;
        }

        .role-card h3.card-name {
            margin-top: 0;
            margin-bottom: 0;
            border-bottom: 3px solid #f00;
            padding-bottom: 1rem;
        }

        .role-card .card-front {
            justify-content: flex-start;
            align-items: flex-start;
        }

        .role-card .card-context {
            font-family: "Open Sans", sans-serif;
            font-size: 1.3rem;
            line-height: 1.2;
        }

        .special-card {
            width: 10rem;
            height: 15rem;
            transition: .5s ease-in-out;
        }

        .special-card p.card-context {
            opacity: 0;
            font-family: "Open Sans", sans-serif;
            height: 0;
            overflow: hidden;
            padding: 0rem;
            margin: 0;
            text-align: center;
            font-size: 0;
            transition: height .5s ease-in-out, opacity 0.5s ease-in-out 0.4s;
        }

        .special-card h3.card-name {
            font-size: 1.3rem;
            margin: 0;
            transition: .5s ease-in-out;
        }

        .special-card img {
            height: auto;
            width: 100%;
            transition: .5s ease-in-out;
        }

        .special-card-active {
            height: 26rem;
            width: 14.8rem;
        }

        .special-card-active h3.card-name {
            font-size: 2rem;
            margin-top: 2rem;
        }

        .special-card-active p.card-context {
            opacity: 1;
            height: 100%;
            padding: 1rem 1.5rem 0rem 1.5rem;
            font-size: 1.2rem;
        }

        .special-card-active img{
            width: 100%;
        }

    ` as CSSResultGroup
}
