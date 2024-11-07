import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("intro-element")
export class IntroElement extends LitElement {
  @state() private isHidden = false;

  connectedCallback() {
    super.connectedCallback();
  }

  private handleStartClick() {
    this.isHidden = true;
  }

  render() {
    return html`
      <section class="intro-container ${this.isHidden ? "hidden" : ""}">
        <div class="intro-top">
          <h1>Moralis Machina</h1>
          <img
            src="./card-images/redactie-robots.png"
            alt="Logo Moralis Machina"
          />
        </div>
        <div class="intro-bottom">
        <div class="intro-line">
            <div class="intro-circle"></div>
          </div>
          <p class="intro-text">
            Kaartspel voor overheidsorganisaties die hun ideale AI-gebruik
            bepalen
          </p>
          <button class="start-btn" @click="${this.handleStartClick}">
            Begin het spel
          </button>
        </div>
      </section>
    `;
  }

  static styles = css`
    section.intro-container {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 1s ease-in-out;
      transition-delay: 1s;

      .intro-top,
      .intro-bottom {
        width: 100%;
        height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: .75s ease-in-out;
        transition-delay: .25s;
        background-color: #00061e;
      }

      .intro-top {
        justify-content: flex-end;
      }

      .intro-bottom {
        justify-content: flex-start;
      }

      &.hidden .intro-top {
        transform: translateY(-100%);
      }

      &.hidden .intro-bottom {
        transform: translateY(105%);
      }

      &.hidden {
        visibility: hidden;
        pointer-events: none;
        .intro-line {
          max-width: 100%;
        }
      }

      .intro-line {
        transition: .25s ease-in-out;
      }

      h1 {
        font-family: "casus", sans-serif;
        font-size: 8rem;
        font-weight: 100;
        font-style: italic;
        margin: 0;
        margin-bottom: 3rem;
        letter-spacing: -0.2rem;
        color: #eda297;
      }

      img {
        order: -1;
        max-width: 30rem;
      }

      .intro-line {
        width: 100%;
        height: 2px;
        background-color: #eda297;
        max-width: 65rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .intro-circle {
          width: 1.5rem;
          height: 1.5rem;
          background-color: #eda297;
          border-radius: 5rem;
          z-index: 999;
        }
      }

      .intro-text {
        font-family: "casus", sans-serif;
        font-size: 3rem;
        color: #eda297;
        max-width: 60rem;
        text-align: center;
        line-height: normal;
      }

      .start-btn {
        font-family: trade-gothic-next, sans-serif;
        text-transform: uppercase;
        width: fit-content;
        background: none;
        border: 1px solid #eda297;
        padding: 1.5rem 5rem;
        font-size: 1.8rem;
        color: #eda297;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: 0.25s ease-in-out;

        &:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "intro-element": IntroElement;
  }
}
