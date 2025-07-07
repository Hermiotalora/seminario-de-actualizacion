export class CustomPricingPanel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap';

    const w3cssLink = document.createElement('link');
    w3cssLink.rel = 'stylesheet';
    w3cssLink.href = 'https://www.w3schools.com/w3css/5/w3.css';

    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: 'Poppins', sans-serif;
      }

      .title {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
      }

      .pricing-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        padding: 0 20px 20px 20px;
      }

      ul {
        transition: transform 0.3s ease;
      }

      ul:hover {
        transform: scale(1.02);
      }
    `;

    const title = document.createElement('div');
    title.classList.add('title');
    const h2 = document.createElement('h2');
    h2.textContent = 'Responsive Pricing Tables';
    title.appendChild(h2);

    this.container = document.createElement('div');
    this.container.classList.add('pricing-row');

    this.shadowRoot.append(fontLink, w3cssLink, style, title, this.container);

    this._renderPlans([
      {
        title: 'Basic',
        color: 'w3-black',
        storage: '10GB',
        emails: 10,
        domains: 10,
        support: 'Endless',
        price: 10
      },
      {
        title: 'Pro',
        color: 'w3-green',
        storage: '25GB',
        emails: 25,
        domains: 25,
        support: 'Endless',
        price: 25
      },
      {
        title: 'Premium',
        color: 'w3-black',
        storage: '50GB',
        emails: 50,
        domains: 50,
        support: 'Endless',
        price: 50
      }
    ]);
  }

  connectedCallback() {}
  disconnectedCallback() {}
  adoptedCallback() {}
  static get observedAttributes() { return []; }
  attributeChangedCallback() {}

  _renderPlans(plans) {
    this.container.innerHTML = '';

    plans.forEach(plan => {
      const card = document.createElement('div');

      const ul = document.createElement('ul');
      ul.classList.add('w3-ul', 'w3-border', 'w3-center', 'w3-hover-shadow');

      const liTitle = document.createElement('li');
      liTitle.classList.add(plan.color, 'w3-xlarge', 'w3-padding-32');
      liTitle.textContent = plan.title;
      ul.appendChild(liTitle);

      ul.appendChild(this._createListItem(`${plan.storage} Storage`, true));
      ul.appendChild(this._createListItem(`${plan.emails} Emails`, true));
      ul.appendChild(this._createListItem(`${plan.domains} Domains`, true));
      ul.appendChild(this._createListItem(`${plan.support} Support`, true));

      const liPrice = document.createElement('li');
      liPrice.classList.add('w3-padding-16');
      const h2Price = document.createElement('h2');
      h2Price.classList.add('w3-wide');
      h2Price.textContent = `$ ${plan.price}`;
      const span = document.createElement('span');
      span.classList.add('w3-opacity');
      span.textContent = 'per month';
      liPrice.append(h2Price, span);
      ul.appendChild(liPrice);

      const liButton = document.createElement('li');
      liButton.classList.add('w3-light-grey', 'w3-padding-24');
      const btn = document.createElement('button');
      btn.classList.add('w3-button', 'w3-green', 'w3-padding-large');
      btn.textContent = 'Sign Up';
      liButton.appendChild(btn);
      ul.appendChild(liButton);

      card.appendChild(ul);
      this.container.appendChild(card);
    });
  }

  _createListItem(text, bold = false) {
    const li = document.createElement('li');
    li.classList.add('w3-padding-16');

    if (bold) {
      const b = document.createElement('b');
      const parts = text.split(' ');
      b.textContent = parts[0];
      li.appendChild(b);
      li.append(` ${parts.slice(1).join(' ')}`);
    } else {
      li.textContent = text;
    }

    return li;
  }
}

customElements.define('x-pricing-panel', CustomPricingPanel);
