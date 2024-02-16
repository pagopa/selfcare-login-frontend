export default {
  loginPage: {
    title: 'Accedi all’Area Riservata',
    description: 'Lo spazio dedicato agli enti che utilizzano i prodotti di PagoPA.',
    temporaryLogin: {
      alert:
        'Se entri con SPID e riscontri un problema, torna su questa pagina e premi qui accanto',
      join: 'Entra da qui',
    },
    loginBox: {
      title: 'Login',
      spidLogin: 'Entra con SPID',
      cieLogin: 'Entra con CIE',
    },
    privacyAndCondition:
      "Accedendo accetti i <1>Termini e condizioni d’uso</1> del servizio e <3 /> confermi di avere letto <5>l'Informativa Privacy</5>",
  },
  loginPageFromOnboarding: {
    title: 'Come vuoi accedere?',
    description:
      'Seleziona la modalità di accesso che preferisci e inizia il <1 /> processo di  adesione al prodotto <3>{{nomeProdotto}}<3/>.',
    ptDescription:
      'Seleziona la modalità che preferisci per accedere e registrarti <1 /> come Partner tecnologico per il prodotto <3>{{nomeProdotto}}<3/>.',
  },
  spidSelect: {
    title: 'Scegli il tuo SPID',
    modalTitle: 'Scegli il tuo Identity Provider',
    cancelButton: 'Annulla',
    closeButton: 'Esci',
  },
  loginError: {
    title: 'Spiacenti, qualcosa è andato storto.',
    message:
      'A causa di un errore del sistema non è possibile completare la procedura.<1 />Ti chiediamo di riprovare più tardi.',
  },
};
