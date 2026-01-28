export default {
  loginPage: {
    title: 'Log in to the Reserved Area',
    description: 'The space dedicated to institutions that use PagoPA products.',
    loginBox: {
      title: 'Login',
      spidLogin: 'Log in with SPID',
      cieLogin: 'Log in with CIE',
    },
    privacyAndCondition:
      'By logging in, you accept the service <1>terms and conditions of use</1> and <3 />confirm to have read the <5>Privacy Policy</5>',
  },
  loginPageFromOnboarding: {
    title: 'How do you want to log in?',
    description:
      'Select the login method you prefer and start <1 /> the progress for registering for the product <3>{{nomeProdotto}}<3/>.',
    ptDescription:
      'Select the method you prefer to log in and register yourself <1 /> as a technological partner for the product <3>{{nomeProdotto}}<3/>.',
  },
  logoutGoogle: {
    title: 'You have been logged out',
    subTitle: 'To continue using our services, please log in again.',
    loginButton: 'Log In',
    closeWindow: 'Or close the window',
  },
  spidSelect: {
    title: 'Select your SPID',
    modalTitle: 'Select your Identity Provider',
    cancelButton: 'Cancel',
    closeButton: 'Exit',
  },
  loginError: {
    retry: 'Try again',
    close: 'Close',
    tooManyAttempts: {
      title: 'You made too many login <1 />attempts',
      description:
        'You entered an incorrect user name or password too many times. <1 />Check the login data and try again in a few minutes, or contact <3 />your SPID identity supplier to change your credentials.',
    },
    incompatibleCredentials: {
      title: 'Login was not possible',
      description:
        'For safety reasons, you must use an identity with a higher level of <1 />security. For more information, contact your <3 />SPID identity provider.',
    },
    authTimeout: {
      title: 'Too much time has passed',
      description:
        'Too much time has passed since you started your login: start <1 />from the beginning.',
    },
    deniedByUser: {
      title: 'You did not give consent to send <1 />data',
      description: 'To login, you must consent to sending some data.',
    },
    suspendedOrRevoked: {
      title: 'Suspended or revoked identity',
      message:
        'Your SPID identity has been suspended or revoked. For more <1/>information, contact your SPID identity provider.',
    },
    canceledbyUser: {
      title: 'You canceled the login',
      description: 'To enter, retry when you want.',
    },
    generic: {
      title: 'Login was not possible',
      description: 'An problem occurred while logging in. Try again in a few <1/>minutes.',
    },
  },
  breadCrumb: {
    back: 'Go back',
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms and conditions of use',
  },
};
