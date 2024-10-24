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

        cardContainer?.classList.add('flip-back');
        // setTimeout(() => {
            
        // }, 1000);   
        
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
                setTimeout(() => {
                    cardContainer?.classList.remove('flip-back');
                }, 500);
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
            height: 100%;
            display: flex;
            justify-content: center;
            perspective: 100rem;
        }

        .card {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 25rem;
            height: 40rem;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.25s ease-in-out, top 0.25s ease-in-out, left 0.25s ease-in-out;
            cursor: pointer;
            border-radius: 1rem;
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2), -1px -1px 5px rgba(0, 0, 0, 0.2);
        }

        .card-face {
            backface-visibility: hidden;
            height: 100%;
        }

        .card-front {
            display: flex;
            flex-direction: column;
            font-family: "casus", serif;
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
            font-family: "casus", sans-serif;
            height: 100%;
            padding: 1.5rem;
            border-radius: 1rem;
            background-color: #ffffff;
            border: solid .5rem;
            border-radius: 1rem;
        }

        .card-back > .rear-name {
            font-family: "casus", sans-serif;
            font-weight: bold;
            font-size: 2rem;
            padding-bottom: 0.5rem;
            margin: 0 auto;
            text-align: center;
            text-transform: uppercase;
        }

        .card-back > .rear-context {
            font-family: "trade-gothic-next", sans-serif;
            font-size: 1.2rem;
            line-height: 1.2;
            text-align: center;
        }

        .card-back > .rear-hr {
            width: 80%;
            height: 0;
            border: 0.01em solid #cccccc;
            margin: 0.5rem auto;
        }
        
        .question-container > .rear-question1{
            padding-bottom: 1rem;
        }

        .question-container > .rear-question1, .question-container > .rear-question2   {
            font-family: "trade-gothic-next", sans-serif;
            font-size: 1.3rem;
            line-height: 1.2;
        }
        
        .question-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .card-back > .filler {
            flex-grow: 1;
        }
        
        .tag-container > .rear-tag1, .tag-container > .rear-tag2 {
            font-size: 1rem;
            text-transform: uppercase;
        }
        
        .tag-container {
            font-family: "trade-gothic-next", sans-serif;
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
        }

        .card-name {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            margin-top: 0.8rem;
            text-transform: uppercase;
            user-select: none;
        }

        .is-flipped {
            transform: rotateY(-180deg);
        }

        .card-yellow .is-flipped, .card-blue .is-flipped{
            transform: rotateY(-180deg);
        }

        .card-green .is-flipped, .card-red .is-flipped{
            transform: rotateY(180deg);
        }

        .card-button {
            align-self: flex-end;
            font-family: "trade-gothic-next", sans-serif;
            text-transform: uppercase;
            width: fit-content;
            background: none;
            border: 1px solid #000;
            // color: #ffffff;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: 0.25s ease-in-out;
        }
            
        .card-button:hover {
            background: #333333;
            color: #ffffff;
        }

        .role-card {
            max-width: 100%;
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
            user-select: none;
        }

        .role-card .card-front {
            justify-content: flex-start;
            align-items: center;
            background-color: #f1ded4;
        }

        .role-card .card-context {
            font-family: "trade-gothic-next", sans-serif;
            font-size: 1.5rem;
            line-height: 1.4;
            text-align: center;
        }

        .role-card img {
            mix-blend-mode: multiply;
        }

        .special-card {
            width: 10rem;
            height: 15rem;
            transition: .5s ease-in-out;
        }

        .special-card p.card-context {
            opacity: 0;
            font-family: "trade-gothic-next", sans-serif;
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
