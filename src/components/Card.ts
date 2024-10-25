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
        card?.classList.toggle('is-flipped');
        body.classList.toggle('overlay-active');
    
        const handleClickOutside = (event: MouseEvent) => {
            const path = event.composedPath();
            const clickedOnSpecialCard = path.some(el => (el as HTMLElement).classList?.contains('special-card'));
            const clickedOnSpecialCardButton = path.some(el => (el as HTMLElement).classList?.contains('special-card-button'));
    
            if (path.includes(card) || (!clickedOnSpecialCard && !clickedOnSpecialCardButton && !path.includes(card))) {
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
            cursor: pointer;
            border-radius: 1rem;
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2), -1px -1px 5px rgba(0, 0, 0, 0.2);
            transition: transform 0.25s ease-in-out, top 0.25s ease-in-out, left 0.25s ease-in-out;
        }

        .card-face {
            backface-visibility: hidden;
            height: 100%;
        }

        .card-front {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            font-family: "casus", serif;
            backface-visibility: hidden;
            justify-content: center;
            align-items: center;
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
            padding: 0 3rem;
        }

        .card-back {
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
            font-family: "casus", sans-serif;
            background-color: #ffffff;
            border: solid .5rem;
            border-radius: 1rem;
            transform: rotateY(180deg);

            .rear-name {
                font-family: "casus", sans-serif;
                font-weight: bold;
                font-size: 2rem;
                padding-bottom: 0.5rem;
                margin: 0 auto;
                text-align: center;
                text-transform: uppercase;
            }

            .rear-hr {
                width: 80%;
                height: 0.5px;
                margin: 0.5rem auto;
            }

            .rear-context {
                font-family: "trade-gothic-next", sans-serif;
                font-size: 1.3rem;
                line-height: 1.2;
                text-align: center;
            }

            .question-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .rear-question1{
                    padding-bottom: 1rem;
                }

                .rear-question1, .rear-question2 {
                    font-family: "trade-gothic-next", sans-serif;
                    font-size: 1.3rem;
                    line-height: 1.2;
                    text-align: center;
                }
            }

            .filler {
                flex-grow: 1;
            }

            .tag-container {
                font-family: "trade-gothic-next", sans-serif;
                display: flex;
                flex-flow: wrap;
                justify-content: center;
                gap: 0.5rem;

                .rear-tag1, .rear-tag2 {
                    font-size: 1rem;
                    text-transform: uppercase;
                }
            }

            .card-button {
                margin: auto;
                font-family: "trade-gothic-next", sans-serif;
                text-transform: uppercase;
                width: fit-content;
                background: none;
                border: 1px solid #000000;
                padding: 1rem 2rem;
                font-size: 1.2rem;
                border-radius: 0.25rem;
                cursor: pointer;
                transition: 0.25s ease-in-out;

                &:hover {
                    background: #333333;
                    color: #ffffff;
                }
            }
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

        .role-card {
            max-width: 100%;
            height: 35rem;
            cursor: unset;
            border: none;
            box-shadow: none;

            .card-front {
                justify-content: flex-start;
                align-items: center;
                background-color: #f1ded4;
            }

            h3.card-name {
                margin-top: 0;
                margin-bottom: 0;
                border-bottom: 1px solid #F87561;
                padding-bottom: 1rem;
                padding-left: 0;
                padding-right: 0;
                user-select: none;
            }

            .card-context {
                font-family: "trade-gothic-next", sans-serif;
                font-size: 1.5rem;
                line-height: 1.4;
                text-align: center;
            }

            img {
                mix-blend-mode: multiply;
            }
        }

        .special-card-button {
            width: 100%;
            height: 19.5rem;
            background-color: #ccc9d8;
            border: solid .7rem #9F99B7;
            border-radius: 1.5rem;
            cursor: pointer;
            margin: 0;
            
            p {
                font-family: "casus", serif;
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
                margin: 0;
                text-transform: uppercase;
                user-select: none;
            }
            img {
                max-width: 10rem;
            }
        }

        .special-card {
            top: 0;
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            max-width: 100%;
            transition: .5s ease-in-out;
            border-radius: 1.5rem;
            overflow: hidden;
            z-index: -1;

            h3.card-name {
                margin: 0;
                padding: 0 3rem;
            }

            img {
                height: auto;
                width: 100%;
                max-width: 20rem;
            }

            p.card-context {
                font-family: "trade-gothic-next", sans-serif;
                padding: 0rem 2rem;
                font-size: 1.5rem;
                line-height: 1.4;
                text-align: center;
            }
        }

        .special-card-active {
            opacity: 1;
            top: 0;
            z-index: 3;
        }

    ` as CSSResultGroup
}
