let navRoutesJSON =
[
  {
    label: "Inicio",
    isPublic: true,
    url: ""
  },
  {
    label: "Comercios",
    url: "commerces",
    isPublic: true
  },
  {
    label: "Servicios",
    isPublic: true,
    subsections: [
      {
        label: "Afilia tu local",
        url: "join-us",
        isPublic: true
      },
      {
        label: "Atención al cliente",
        url: "support",
        isPublic: true
      }
    ]
  },
  {
    label: "Ayuda",
    url: "help",
    isPublic: true
  }
]

export {navRoutesJSON}
