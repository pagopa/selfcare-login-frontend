export default {
  loginPage: {
    title: 'Accéder à l’Espace Réservé',
    description: 'L’espace dédié aux organismes utilisant les produits de PagoPA.',
    temporaryLogin: {
      alert:
        'Si vous vous connectez avec le SPID et que vous rencontrez un problème, revenez à cette page et cliquez ici',
      join: 'Entrez ici',
    },
    loginBox: {
      title: 'Login',
      spidLogin: 'Entrez avec SPID',
      cieLogin: 'Entrez avec CIE',
    },
    privacyAndCondition:
      "En continuant vous acceptez les <1>Conditions générales d’utilisation</1> du service et <3 /> vous confirmez que vous avez lu <5>la Charte de confidentialité</5>",
  },
  loginPageFromOnboarding: {
    title: 'Comment voulez-vous y accéder ?',
    description:
      'Sélectionnez le mode d’accès que vous préférez et lancez la <1 /> procédure d’adhésion au produit <3>{{nomProduit}}<3/>.',
    ptDescription:
      'Sélectionnez votre mode préféré pour vous connecter et vous enregistrer <1 /> en tant que Partenaire technologique pour le produit <3>{{nomProduit}}<3/>.',
  },
  spidSelect: {
    title: 'Choisissez votre SPID',
    modalTitle: 'Choisissez votre fournisseur d’identité',
    cancelButton: 'Annuler',
    closeButton: 'Sortir',
  },
  loginError: {
    retry: 'Réessayer',
    close: 'Fermer',
    tooManyAttempts: {
      title: 'Vous avez effectué trop de tentatives de <1 />connexion',
      description:
        'Vous avez saisi un nom d’utilisateur ou un mot de passe incorrects trop souvent. <1 />Veuillez vérifier vos données de connexion et réessayer dans quelques minutes, ou contactez <3 />votre fournisseur d’identité SPID pour modifier vos données d’identification.',
    },
    incompatibleCredentials: {
      title: 'Impossible de se connecter',
      description:
        'Pour des raisons de sécurité, vous devez utiliser une identité avec un niveau de <1 />sécurité plus élevé. Veuillez contacter votre <3 />fournisseur d’identité SPID pour plus d’informations.',
    },
    authTimeout: {
      title: 'Trop de temps s’est écoulé',
      description:
        "Trop de temps s’est écoulé depuis que vous avez commencé la procédure de connexion : recommencez <1 />depuis le début.",
    },
    deniedByUser: {
      title: 'Vous n’avez pas consenti à l’envoi <1 />des données',
      description: 'Pour accéder, vous devez consentir à l’envoi de certaines données.',
    },
    suspendedOrRevoked: {
      title: 'Identité suspendue ou révoquée',
      message:
        'Votre identité SPID est suspendue ou révoquée. Veuillez contacter votre fournisseur d’identité SPID pour plus d’<1/>informations.',
    },
    canceledbyUser: {
      title: 'Vous avez annulé l’accès',
      description: 'Pour vous connecter, réessayez à tout moment.',
    },
    generic: {
      title: 'Impossible de se connecter',
      description: 'Une erreur s’est produite lors de la connexion. Réessayez dans quelques <1/>minutes.',
    },
  },
  breadCrumb: {
    back: 'Retour',
    privacyPolicy: 'Charte de confidentialité',
    termsAndConditions: 'Conditions d’utilisation',
  },
};
