const mobileMenu = document.getElementById('menu-mobile');
const navToggle = document.querySelector('.nav__toggle');
const body = document.body;

function toggleMobileNav(forceClose = false) {
  if (!mobileMenu || !navToggle) return;

  const isOpen = mobileMenu.classList.contains('is-open');
  const shouldOpen = forceClose ? false : !isOpen;

  mobileMenu.classList.toggle('is-open', shouldOpen);
  navToggle.setAttribute('aria-expanded', shouldOpen);
  navToggle.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');
  body.classList.toggle('no-scroll', shouldOpen);
}

document.addEventListener('click', (event) => {
  if (!mobileMenu) return;

  if (mobileMenu.classList.contains('is-open')) {
    const clickedOutside = !mobileMenu.contains(event.target) && !navToggle.contains(event.target);
    if (clickedOutside) toggleMobileNav(true);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
    toggleMobileNav(true);
  }
});

const currentYearEl = document.getElementById('ano-atual');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contato-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const nome = formData.get('nome')?.trim() || 'Não informado';
    const email = formData.get('email')?.trim() || 'Não informado';
    const telefone = formData.get('telefone')?.trim() || 'Não informado';
    const servico = formData.get('servico') || 'Não informado';
    const mensagem = formData.get('mensagem')?.trim() || 'Sem mensagem adicional.';

    const texto = `Olá, Alessandra! Gostaria de agendar um atendimento.

Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}
Serviço de interesse: ${servico}

Mensagem:
${mensagem}`;

    const whatsappUrl = `https://wa.me/5545999132434?text=${encodeURIComponent(texto)}`;
    window.open(whatsappUrl, '_blank');
  });
}

