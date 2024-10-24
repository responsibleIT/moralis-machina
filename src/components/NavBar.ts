import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("navbar-element")
export class NavBarElement extends LitElement {
  @state()
  private isGameRulesOpen = false;

  @state()
  private isGameRulesActive = true;

  @state()
  private isAboutContentActive = false;

  connectedCallback() {
    super.connectedCallback();
  }

  toggleGameRulesMenu() {
    this.isGameRulesOpen = !this.isGameRulesOpen;
  }

  showGameRulesContent() {
    this.isGameRulesActive = true;
    this.isAboutContentActive = false;
  }

  showAboutContent() {
    this.isGameRulesActive = false;
    this.isAboutContentActive = true;
  }

  render() {
    return html`
      <nav>
        <a href="/"><h1>Moralis Machina</h1></a>
        <button class="help-button" @click=${this.toggleGameRulesMenu}>
          Hoe werkt het spel?
        </button>
      </nav>
      <section
        class="game-rules-menu ${this.isGameRulesOpen
          ? "game-rules-menu-open"
          : ""}"
      >
        <ul class="tabs">
          <li>
            <button
              aria-pressed="${this.isGameRulesActive ? "true" : "false"}"
              @click=${this.showGameRulesContent}
            >
              Spelregels
            </button>
          </li>
          <li>
            <button
              aria-pressed="${this.isAboutContentActive ? "true" : "false"}"
              class="about-btn"
              @click=${this.showAboutContent}
            >
              Over dit spel
            </button>
          </li>
          <li>
            <button class="close-btn" @click=${this.toggleGameRulesMenu}>
              <p><span>Sluit</span><span>&times</span></p>
            </button>
          </li>
        </ul>

        <div class="content-container">
          <div
            class="game-rules-content ${this.isGameRulesActive
              ? "game-rules-content-active"
              : ""}"
          >
            <section class="text-container">
              <h3>Doel van het spel</h3>
              <p class="intro-text">
                Het doel van dit spel is bewustzijn creëren, kritisch denken
                bevorderen en gezamenlijke standpunten en oplossingen
                ontwikkelen voor de uitdagingen die generatieve AI met zich
                meebrengt.
              </p>
            </section>
            <section class="text-container setup-decks-container">
              <h3>Setup</h3>
              <p>
                De groep ontvangt 15 scenariokaarten verdeeld in 4 stapels, elk
                overeenkomend met een verschillende rol die generatieve AI in
                het werk kan innemen:
              </p>
              <ul>
                <li>
                  <img src="../game-rules-images/deck-redacteur.png" />
                  <p>Stapel 1: De Redacteur</p>
                </li>
                <li>
                  <img src="../game-rules-images/deck-leeshulp.png" />
                  <p>Stapel 2: De Leeshulp</p>
                </li>
                <li>
                  <img src="../game-rules-images/deck-orakel.png" />
                  <p>Stapel 3: Het Orakel</p>
                </li>
                <li>
                  <img src="../game-rules-images/deck-schrijver.png" />
                  <p>Stapel 4: De Schrijver</p>
                </li>
              </ul>
            </section>
            <section class="text-container setup-decks-container">
              <h3>Aantal spelers</h3>
              <p>4-15 spelers</p>
            </section>
            <section class="text-container">
              <h3>Spelverloop</h3>
              <ol>
                <li>
                  Een deelnemer kiest een scenariokaart van een van de vier
                  stapels en leest die voor.
                </li>
                <li>
                  De groep wijst 'De Redenaar' aan, die als eerste zijn of haar
                  mening over het scenario deelt.
                </li>
                <li>
                  De groep krijgt 5 tot 10 minuten om te discussiëren en
                  gezamenlijke standpunten te formuleren.
                </li>
                <li>De notulist noteert de belangrijkste bevindingen.</li>
                <li>De begeleider houdt de tijd in de gaten.</li>
              </ol>
              <p>
                Elke speler kan één keer tijdens het spel de rol van 'De
                Dissident' aannemen om tegen de groepsconsensus in te gaan.
              </p>
            </section>
            <section class="text-container">
              <h3>Einde van het spel</h3>
              <p>
                Het spel eindigt wanneer alle kaarten zijn besproken of wanneer
                ten minste één scenario-kaart van elke van de vier stapels is
                besproken, afhankelijk van de beschikbare tijd en de
                prioriteiten van de groep.
              </p>
            </section>
          </div>
          <div
            class="about-content ${this.isAboutContentActive
              ? "about-content-active"
              : ""}"
          >
            <section class="text-container">
              <p>
                De provincie Noord-Holland en de Hogeschool van Amsterdam werken
                samen om praktijkgericht te onderzoeken wat de impact van
                generatieve AI op overheidswerk is. Dit spel is daar een
                resultaat van. Elke kaart in het spel daagt spelers uit om zich
                in te leven in scenario's die de effecten van AI op het werk
                laten zien. De kaarten onthullen onverwachte gevolgen,
                stimuleren discussie en helpen praktische oplossingen te vinden
                voor de uitdagingen van generatieve AI.
              </p>
              <p>
                Meer weten of bevindingen delen? Via <a href="mailto:veermanm@noord-holland.nl">veermanm@noord-holland.nl
                </a>en <a href="mailto:s.horsman@hva.nl">s.horsman@hva.nl</a> kan je ons bereiken.
              </p>
            </section>
            <section class="text-container">
              <p>We horen graag je mening over dit spel</p>
              <img src="../game-rules-images/survey-qr-code.png" />
              <a href="https://moralis.responsible-it.nl/" target="_blank"
                >https://moralis.responsible-it.nl</a
              >
            </section>
            <section class="text-container">
              <p>
                Makers: Martijn Veerman, Sophie Horsman en Jeroen Silvis. Dit
                spel is gemaakt met behulp van de AI-tools ChatGPT (tekst) en
                Adobe Firefly (beeld).
              </p>
            </section>
          </div>
        </div>
      </section>
    `;
  }

  static styles = css`
    h1 {
      font-family: "casus", sans-serif;
      font-size: 5rem;
      font-weight: 100;
      font-style: italic;
      margin: auto;
    }
    nav {
      display: flex;
      max-width: 140rem;
      max-height: 20vh;
      margin: 2rem auto 0 auto;
      justify-content: space-between;
      align-items: center;
    }

    nav > a {
      text-decoration: none;
      color: black;
    }

    button.help-button {
      font-family: "casus", sans-serif;
      cursor: pointer;
      background: none;
      border: 1px solid #000000;
      padding: 0.5rem 2rem;
      font-size: 1.7rem;
      transition: 0.25s ease-in-out;
      filter: grayscale(1);

      &:hover {
        background-color: #000000;
        color: #ffffff;
      }
    }

    section.game-rules-menu {
      overflow-y: scroll;
      z-index: 9999;
      width: 35vw;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      background-color: #ffffff;
      transition: 0.5s ease-in-out;
      transform: translateX(100%);
      border-left: 2px solid #000000;

      ul.tabs {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 2rem 3rem 0 3rem;
        list-style-type: none;
        margin-bottom: 2rem;

        li {
          button {
            font-family: "casus", sans-serif;
            width: 100%;
            height: 100%;
            background: none;
            border: 1px solid #000000;
            font-size: 2rem;
            padding: 1rem;
            text-transform: uppercase;
            cursor: pointer;
            transition: 0.25s ease-in-out;

            &:hover {
              background-color: #000;
              color: #fff;
            }
          }

          button[aria-pressed="true"] {
            background-color: #292929;
            color: #fff;
          }
        }
        li:first-of-type {
          button {
            border-right: none;
          }
        }
        li:last-of-type {
          button {
            padding-right: 0;
            padding-left: 2rem;
            &:hover {
              background: none;
              color: #000000;
            }
          }
          border: none;
        }
        li:not(:last-of-type) {
          flex-grow: 1;
        }
      }

      div.content-container {
        display: flex;
        overflow-x: hidden;
      }

      div.game-rules-content,
      div.about-content {
        flex-shrink: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        transition: 0.5s ease-in-out;
      }

      div.game-rules-content {
        transform: translateX(-100%);
      }

      div.game-rules-content-active {
        transform: translateX(0);
      }

      div.about-content {
        transform: translateX(0);
        img {
          width: 100%;
          max-width: 15rem;
        }
      }

      div.about-content-active {
        transform: translateX(-100%);
      }

      .text-container {
        display: flex;
        flex-direction: column;
        padding: 0 3rem;

        h3, h4{
         font-family: "casus", serif;
        }
        h3 {
          font-size: 2rem;
          margin: 0;
        }

        h4 {
          margin: 0;
        }

        a {
          font-size: 1.4rem;
          font-style: italic;
        }

        p,
        li,
        a {
          font-family: "trade-gothic-next", sans-serif;
          font-size: 1.4rem;
          line-height: 1.2;
        }

        p.intro-text {
          font-size: 1.8rem;
          line-height: 1.3;
          margin-top: 1rem;
          margin-bottom: 0;
        }

        &:last-of-type {
          flex-grow: 1;
          margin-bottom: 10rem;
        }
      }

      .setup-decks-container {
        ul {
          display: flex;
          flex-wrap: wrap;
          padding: 0;
          list-style-type: none;
          row-gap: 2rem;
          li {
            display: flex;
            flex-basis: 50%;
            align-items: center;
            gap: 1rem;
            img {
              width: 100%;
              max-width: 6rem;
              object-fit: contain;
            }
            p {
              margin: 0;
              font-size: 1.3rem;
              font-style: italic;
              font-weight: 100;
            }
          }
        }

        .amount-players-container {
          max-width: 15rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: fit-content;
          width: 100%;
          padding: 1rem 1rem;
          border: 1px solid #000000;

          p {
            margin: 0;
          }
        }
      }

      .close-btn {
        background: none;
        border: none !important;
        text-transform: uppercase;
        font-size: 2rem;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        font-family: "casus", sans-serif;

        &:hover {
          span:last-of-type {
            transform: rotate(-90deg) translate(-0.3rem, -0.3rem);
          }
        }

        p {
          display: flex;
          align-items: center;
          margin: 0;
          line-height: 1;

          span {
            transition: 0.5s ease-in-out;
            &:last-of-type {
              font-weight: 100;
              font-size: 3.5rem;
              color: #f00;
              margin-top: -0.5rem;
            }
          }
        }
      }
    }

    section.game-rules-menu-open {
      transform: translateX(0);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "navbar-element": NavBarElement;
  }
}
