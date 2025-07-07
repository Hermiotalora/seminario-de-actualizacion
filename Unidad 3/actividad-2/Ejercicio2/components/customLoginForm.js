export class CustomLoginForm extends HTMLElement {
  constructor() {
    super();

    // Crear shadow DOM
    this.attachShadow({ mode: 'open' });

    // Cargar W3CSS como link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://www.w3schools.com/w3css/5/w3.css';

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.classList.add('w3-container', 'w3-half', 'w3-margin-top');

    // Formulario
    const form = document.createElement('form');
    form.classList.add('w3-container', 'w3-card-4');

    // Name input
    const pName = document.createElement('p');
    const inputName = document.createElement('input');
    inputName.classList.add('w3-input');
    inputName.type = 'text';
    inputName.required = true;
    inputName.style.width = '90%';
    const labelName = document.createElement('label');
    labelName.textContent = 'Name';
    pName.appendChild(inputName);
    pName.appendChild(labelName);

    // Password input
    const pPassword = document.createElement('p');
    const inputPass = document.createElement('input');
    inputPass.classList.add('w3-input');
    inputPass.type = 'password';
    inputPass.required = true;
    inputPass.style.width = '90%';
    const labelPass = document.createElement('label');
    labelPass.textContent = 'Password';
    pPassword.appendChild(inputPass);
    pPassword.appendChild(labelPass);

    // Gender radios
    const genders = [
      { label: 'Male', value: 'male', checked: true },
      { label: 'Female', value: 'female', checked: false },
      { label: "Don't know (Disabled)", value: '', checked: false, disabled: true }
    ];

    genders.forEach(g => {
      const p = document.createElement('p');
      const radio = document.createElement('input');
      radio.classList.add('w3-radio');
      radio.type = 'radio';
      radio.name = 'gender';
      radio.value = g.value;
      if (g.checked) radio.checked = true;
      if (g.disabled) radio.disabled = true;
      const label = document.createElement('label');
      label.textContent = g.label;
      p.appendChild(radio);
      p.appendChild(label);
      form.appendChild(p);
    });

    // Stay logged in checkbox
    const pStay = document.createElement('p');
    const checkbox = document.createElement('input');
    checkbox.classList.add('w3-check');
    checkbox.type = 'checkbox';
    checkbox.id = 'stayLogged';
    checkbox.checked = true;
    const labelStay = document.createElement('label');
    labelStay.textContent = 'Stay logged in';
    pStay.appendChild(checkbox);
    pStay.appendChild(labelStay);

    // Botón de login
    const pButton = document.createElement('p');
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Log in';
    button.classList.add('w3-button', 'w3-section', 'w3-teal', 'w3-ripple');
    pButton.appendChild(button);

    // Ensamblar formulario
    form.appendChild(pName);
    form.appendChild(pPassword);
    form.appendChild(pStay);
    form.appendChild(pButton);

    // Manejo del evento submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inputName.value;
      const password = inputPass.value;
      const stayLogged = checkbox.checked;
      console.log('Name:', name);
      console.log('Password:', password);
      console.log('Stay logged in:', stayLogged);
      // Aquí se puede emitir evento personalizado si se desea
    });

    wrapper.appendChild(form);

    // Agregar al Shadow DOM
    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(wrapper);
  }

  connectedCallback() {
    // Activado cuando el componente es insertado en el DOM
  }

  disconnectedCallback() {
    // Activado cuando el componente es removido del DOM
  }

  adoptedCallback() {}
  static get observedAttributes() { return []; }
  attributeChangedCallback(name, oldVal, newVal) {}
}

customElements.define('x-login-form', CustomLoginForm);
