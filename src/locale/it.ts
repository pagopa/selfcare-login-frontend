export default {
  loginPage: {
    // commented following SELC-1165
    // title: 'Entra con SPID o CIE',
    // description: 'Seleziona la modalità di autenticazione che preferisci.',
    title: 'Entra con SPID',
    description:
      'Accedi con la tua identità digitale, inserendo le credenziali del <1/> tuo gestore.',
    loginBox: {
      title: 'Login',
      spidLogin: 'Entra con SPID',
      cieLogin: 'Entra con CIE',
    },
    hintText: 'Non hai SPID? <1>Scopri di più</1>',
    privacyAndCondition:
      "Autenticandoti dichiari di aver letto e accettato l'<1>Informativa</1> <2/> <3>Privacy</3> e i <5>Termini e condizioni d’uso</5>",
  },
  spidSelect: {
    title: 'Scegli il tuo SPID',
    hintText: 'Non hai SPID?<1> Scopri di più</1>',
    cancelButton: 'Annulla',
  },
  loginError: {
    title: 'Spiacenti, qualcosa è andato storto.',
    message:
      'A causa di un errore del sistema non è possibile completare la procedura.<1 />Ti chiediamo di riprovare più tardi.',
  },
};
