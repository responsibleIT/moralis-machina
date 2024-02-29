import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('card-element')
export abstract class CardElement extends LitElement {
    @property({type: String})
    name: string

    @property({type: String})
    context: string

    @property({type: String})
    image: string

    @property({type: Boolean})
    isFlipped: boolean = false

    protected constructor(name: string, context: string, image: string) {
        super();
        this.name = name;
        this.context = context;
        this.image = image;
    }

    public flip() {
        this.isFlipped = !this.isFlipped;

        const front = this.shadowRoot.querySelector('.card-front')
        const rear = this.shadowRoot.querySelector('.card-rear')

        if (this.isFlipped) {
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
