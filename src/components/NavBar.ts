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
        <button class="info-button" @click=${this.toggleGameRulesMenu}>
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
              <p><span>&times</span></p>
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
              <h3>Doel</h3>
              <p>
                Het doel van dit spel is bewustzijn creëren, kritisch denken
                bevorderen en gezamenlijke standpunten en oplossingen
                ontwikkelen voor de uitdagingen die generatieve AI met zich
                meebrengt.
              </p>
            </section>
            <section class="text-container setup-decks-container">
              <h3>Opzet</h3>
              <p>
                De groep ontvangt 15 scenariokaarten verdeeld in 4 stapels, elk
                overeenkomend met een verschillende rol die generatieve AI in
                het werk kan innemen:
              </p>
              <ul>
                <li>Stapel 1: De Redacteur</li>
                <li>Stapel 2: De Leeshulp</li>
                <li>Stapel 3: Het Orakel</li>
                <li>Stapel 4: De Schrijver</li>
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
              <ul>
                <li>Concept: Martijn Veerman, Sophie Horsman en Jeroen Silvis.</li>
                <li>UX & Web Development: Yuri Westplat, Bahaa Salaymeh</li>
                <li>Software Engineering: Rick van Kersbergen, Tabish Nanhekhan</li>
              </ul>
              <p>
                Dit spel is gemaakt met behulp van de AI-tools ChatGPT (tekst) en
                Adobe Firefly (beeld).
              </p>
              <ul class="logos">
                <li>
                  <img src="../game-rules-images/logo-HvA.png" alt="Hogeschool van Amsterdam Logo"/>
                </li>
                <li>
                  <img src="../game-rules-images/logo-PNH.png" alt="Provincie Noord Holland Logo"/>
                </li>
              </ul>
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
      letter-spacing: -0.2rem;
      color: #eda297;
    }

    nav {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
      max-width: 140rem;
      max-height: 20vh;
      margin: 2rem auto 0 auto;
      justify-content: space-between;
      align-items: center;
    }

    nav > a {
      grid-column: span 4;
      grid-row: 1;
      text-align: center;
      text-decoration: none;
      color: #000000;
    }

    button.info-button {
      position: absolute;
      top: 0;
      right: 0;
      background: #ffffff;
      font-family: "casus", sans-serif;
      cursor: pointer;
      border: none;
      padding: 1.5rem 3rem;
      font-size: 1.7rem;
      text-transform: uppercase;
      border-bottom-left-radius: 1rem;
      box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.2);
      transition: 0.25s ease-in-out;

      &:hover {
        background-color: #000000;
        color: #ffffff;
      }
    }

    section.game-rules-menu {
      overflow-y: scroll;
      z-index: 9999;
      width: 28vw;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      background-color: #ffffff;
      transition: 0.5s ease-in-out;
      transform: translateX(100%);
      box-shadow: 0 0 .5rem rgb(0 0 0 / 30%);

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
            padding: 0;
            background: none;
            border: none;
            font-size: 2rem;
            text-align: left;
            text-transform: uppercase;
            cursor: pointer;
            transition: 0.25s ease-in-out;

            &:hover {
              color: #cc0100;
            }
          }
        }

        li:first-of-type {
          button {
            border-right: none;
          }
        }

        li:last-of-type {
          margin-left: auto;
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
          margin-right: 2rem;
          button {
            border-bottom: 3px solid transparent;
          }
          button[aria-pressed="true"] {
              border-color: #cc0100;
              color: #cc0100;
          }
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
          margin: 0;
        }

        h3 {
          color: #cc0100;
          font-size: 2rem;
          text-transform: uppercase;
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
          
        ul, ol {
          padding-left: 1.5rem;
        }

        &:last-of-type {
          flex-grow: 1;
          margin-bottom: 10rem;
        }

        ul.logos {
          display: flex;
          list-style-type: none;
          padding: 0;
          gap: 4rem;
        }
      }

      .setup-decks-container {
        ul {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-left: 0;
          list-style-type: none;

          li {
            display: flex;
            align-items: center;
            gap: 1rem;

            &::before {
              content: "";
              background: lightgray;
              padding: .6rem;
              border-radius: 5rem;
              width: .6rem;
              height: .6rem;
              display: block;
            }

            &:first-of-type::before{
               background-color: #F1C74E;
            }

            &:nth-of-type(2)::before {
              background-color: #62BDC6;
            }

            &:nth-of-type(3)::before {
              background-color: #8EC268;
            }

            &:nth-of-type(4)::before {
              background-color: #E8705F;
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
              color: #cc0100;
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
