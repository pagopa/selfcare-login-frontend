export default {
  loginPage: {
    title: 'Zugang zum reservierten Bereich',
    description: 'Der Bereich für die Körperschaften, die PagoPA-Produkte verwenden.',
    loginBox: {
      title: 'Login',
      spidLogin: 'Mit SPID anmelden',
      cieLogin: 'Mit CIE anmelden',
    },
    privacyAndCondition:
      'Durch Anmelden am Dienst erklärst du dich mit dessen <1>Nutzungsbedingungen</1> einverstanden <3 />und bestätigst, die <5>Datenschutzerklärung gelesen zu haben.</5>',
  },
  loginPageFromOnboarding: {
    title: 'Wie möchtest du dich anmelden?',
    description:
      'Wähle deinen bevorzugten Anmeldemodus und beginne mit dem <1 /> Beitritt zum Produkt <3>{{nomeProdotto}}<3/>.',
    ptDescription:
      'Wähle deinen bevorzugzten Anmeldemodus und registriere dich <1 /> als technologischer Partner für das Produkt <3>{{nomeProdotto}}<3/>.',
  },
  spidSelect: {
    title: 'Wähle deinen SPID-Anbieter',
    modalTitle: 'Wähle deinen Identity Provider',
    cancelButton: 'Abbrechen',
    closeButton: 'Beenden',
  },
  loginError: {
    retry: 'Erneut versuchen',
    close: 'Schließen',
    tooManyAttempts: {
      title: 'Du hast zu viele <1 />Anmeldeversuche unternommen',
      description:
        'Du hast zu oft einen falschen Benutzernamen oder ein falsches Passwort eingegeben. <1 />Prüfe die Anmeldedaten und versuche es bitte in einigen Minuten erneut oder wende dich an <3 />deinen SPID-Identitätsanbieter, um deine Anmeldeinformationen zu ändern.',
    },
    incompatibleCredentials: {
      title: 'Anmeldung fehlgeschlagen',
      description:
        'Aus Sicherheitsgründen musst du eine Identität mit einer höheren <1 />Sicherheitsstufe verwenden. Für weiterführende Informationen wende dich bitte an <3 />deinen SPID-Identitätsanbieter.',
    },
    authTimeout: {
      title: 'Zu viel Zeit ist vergangen',
      description: 'Seit deinem Anmeldeversuch ist zu viel Zeit vergangen: Beginne <1 />von vorne.',
    },
    deniedByUser: {
      title: 'Du hast der Übermittlung <1 />der Daten nicht zugestimmt',
      description: 'Zum Anmelden ist es notwendig, der Übermittlung einiger Daten zuzustimmen.',
    },
    suspendedOrRevoked: {
      title: 'Identität gesperrt oder widerrufen',
      message:
        'Deine SPID-Identität ist gesperrt oder widerrufen. Für mehr <1/>Informationen wende dich bitte an deinen SPID-Identitätsanbieter.',
    },
    canceledbyUser: {
      title: 'Du hast die Anmeldung abgebrochen',
      description: 'Du kannst die Anmeldung jederzeit wieder versuchen.',
    },
    generic: {
      title: 'Anmeldung fehlgeschlagen',
      description:
        'Beim Anmelden ist ein Problem aufgetreten. Versuch es in einigen <1/>Minuten erneut.',
    },
  },
  breadCrumb: {
    back: 'Zurück',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsAndConditions: 'Nutzungsbedingungen',
  },
};
