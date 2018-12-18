//Navigation elements (logo, hamburger, modal, links to projects)
const navigation = {
  navToggle: document.getElementById('nav-toggle'),
  navContainer: document.getElementById('nav-modal'),
  navContents: document.getElementById('nav-modal__contents'),

  init() {
    this.events();
  },

  events() {
    this.navToggle.addEventListener('click', function () {
      navigation.toggleModal()
    });
  },

  // Close Modal navigation
  closeModal() {
    this.navToggle.classList.remove('open');
    this.navContainer.classList.remove('nav-modal--expanded');
    this.navContents.classList.remove('nav-modal__contents--expanded');
  },

  // Toggle Modal navigation
  toggleModal() {
    this.navToggle.classList.toggle('open');
    this.navContainer.classList.toggle('nav-modal--expanded');
    this.navContents.classList.toggle('nav-modal__contents--expanded');
  }

}