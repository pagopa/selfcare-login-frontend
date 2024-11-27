export default {
  loginPage: {
    title: 'Dostopajte do rezerviranega območja',
    description: 'Prostor, namenjen organizacijam, ki uporabljajo produkte PagoPA.',
    temporaryLogin: {
      alert:
        'Če se prijavite s SPID in naletite na težavo, se vrnite na to stran in pritisnite zraven',
      join: 'Vstopite od tukaj',
    },
    loginBox: {
      title: 'Prijava',
      spidLogin: 'Vstopite s SPID',
      cieLogin: 'Vstopite s CIE',
    },
    privacyAndCondition:
      "S prijavo sprejemate <1>Pogoje in določila uporabe</1> storitve in <3 /> potrjujete, da ste prebrali <5>Politiko varovanja zasebnosti</5>",
  },
  loginPageFromOnboarding: {
    title: 'Kako se želite prijaviti?',
    description:
      'Izberite želeni način dostopa in začnite <1 /> postopek pridružitve produktu <3>{{nomeProdotto}}<3/>.',
    ptDescription:
      'Izberite želeni način za dostop in registracijo <1 /> kot tehnološki partner za produkt <3>{{nomeProdotto}}<3/>.',
  },
  spidSelect: {
    title: 'Izberite svoj SPID',
    modalTitle: 'Izberite svojega ponudnika identitete',
    cancelButton: 'Prekliči',
    closeButton: 'Izhod',
  },
  loginError: {
    retry: 'Poskusite znova',
    close: 'Zapri',
    tooManyAttempts: {
      title: 'Prevečkrat ste se poskusili <1 />prijaviti',
      description:
        'Prevečkrat ste vnesli napačno uporabniško ime ali geslo. <1 />Preverite podatke za prijavo in poskusite znova čez nekaj minut ali se obrnite na <3 />svojega ponudnika identitete SPID, da spremenite svoje poverilnice.',
    },
    incompatibleCredentials: {
      title: 'Prijava ni mogoča',
      description:
        'Iz varnostnih razlogov morate uporabiti identiteto z <1 />višjo stopnjo varnosti. Za več informacij se obrnite na <3 />ponudnika identitete SPID.',
    },
    authTimeout: {
      title: 'Minilo je preveč časa',
      description:
        "Preveč časa je minilo, odkar ste začeli s prijavo: začnite od <1 />začetka.",
    },
    deniedByUser: {
      title: 'Niste podali soglasja za pošiljanje <1 />podatkov',
      description: 'Za dostop se morate strinjati s pošiljanjem nekaterih podatkov.',
    },
    suspendedOrRevoked: {
      title: 'Identiteta začasno razveljavljena ali preklicana',
      message:
        'Vaša identiteta SPID je začasno prekinjena ali preklicana. Za več <1/>informacij se obrnite na ponudnika identitete SPID.',
    },
    canceledbyUser: {
      title: 'Preklicali ste dostop',
      description: 'Če želite vstopiti, poskusite znova, kadar koli želite.',
    },
    generic: {
      title: 'Prijava ni mogoča',
      description: 'Pri prijavi je prišlo do težave. Poskusite znova čez nekaj <1/>minut.',
    },
  },
  breadCrumb: {
    back: 'Nazaj',
    privacyPolicy: 'Politika varovanja zasebnosti',
    termsAndConditions: 'Pogoji in določila uporabe',
  },
};
