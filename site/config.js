/*
  Kiosk Studio — site settings
  ============================
  This is the ONE file to edit when your details are ready.
  Leave a value as "" (empty) and the site simply hides whatever depends on it.
  Save the file, open a pull request, merge it — the site updates by itself.
*/
window.KIOSK_CONFIG = {
  // Your first name, shown in the "About" section. Example: "Pietro"
  ownerName: "",

  // Where people can reach you. Example: "hello@kioskstudio.eu"
  email: "",

  // WhatsApp number in international format, digits only, no "+" or spaces.
  // Example: "351912345678"
  whatsapp: "",

  // Optional: where you are based. Example: "Based in Lisbon, working across Europe"
  location: "",

  // Prices, written exactly as they should appear. Example: "€390" and "€19 / month"
  starterPrice: "",
  carePlanPrice: "",

  // Contact form endpoint from Formspree (see README). Example: "https://formspree.io/f/abcdwxyz"
  formEndpoint: "",

  // Your photo for the "About" section. Put the file in site/assets/ first.
  // Example: "assets/me.jpg"
  photo: "",

  // Your logo. Put the file in site/assets/ first. Example: "assets/logo.png"
  logo: "",
  // Set to true if your logo is light-coloured and reads well on dark blue.
  // Leave false to show it on a small white badge so it is always legible.
  logoOnDark: false,

  // Links to live sample sites, once they exist. Example: "../demos/florist/"
  demoLinks: {
    florist: "",
    restaurant: "",
    barbershop: ""
  },

  // Details for the privacy policy and terms pages.
  legal: {
    // Full legal name of the person or company running Kiosk Studio
    name: "",
    // Postal address used for legal notices
    address: "",
    // Country whose law applies. Example: "Portugal"
    country: "",
    // Date you last changed the privacy policy or terms. Example: "1 November 2026"
    lastUpdated: ""
  }
};
