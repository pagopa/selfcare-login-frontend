

const CommonStyles = (theme : any) => ({              // TODO 
  switchBase: {
    color: theme.secondColor,
    "&.Mui-checked": {
      color: theme.secondColor
    },
    "&.Mui-checked + $track": {
      backgroundColor: theme.secondColor
    }
  },
  track: {
    backgroundColor: theme.secondColor
  },
  switchOption: {
    color: "black",
    fontWeight: "normal"
  },

  fullWidthGrid: {
    width: "100%"
  },
  tabs: {
    color: theme.secondColor
  },
  tabSelector: {
    background: "transparent"
  },
  cardColor: {
    background: theme.secondColor + "!important",
    color: theme.generalTextColorInHTMLComponents + "!important",
    fontWeight: "bold",
    height: "60px"
  },

  cardTitleWhite: {
    fontWeight: "bold",
    marginBlockStart: "0px!important"
  },

  root: {
    width: "100%",
    margin: "10px 0"
  },

  checkBox: {
    color: theme.secondColor + "!important"
  },

  formCheckBox: {
    marginTop: "-20px"
  },

  submitButton: {
    backgroundColor: theme.secondColor,
    color: theme.generalTextColorInHTMLComponents,
    fontWeight: "bold"
  },

  iconButton: {
    color: theme.secondColor
  },
  "& label": {
    background: theme.generalTextColorInHTMLComponents,
    zIndex: 10
  },

  buttonInGroup: {
    backgroundColor: theme.secondColor,
    color: theme.generalTextColorInHTMLComponents,
    fontWeight: "bold",
    borderWidth: "2px!important"
  },
  formControlSelection: {
    width: "100%",
    paddingBottom: "15px",
    // margin: "10px 0",
    "& label": {
      background: theme.generalTextColorInHTMLComponents
      // zIndex: 11,
    }
  },
  validationTextFieldNearPanel: {
    width: "100%",
    paddingBottom: "0px"
  },

  validationTextField: {
    width: "100%",
    paddingBottom: "15px"
    //  margin: "10px 0",
  },
  validationTextFieldAutocomplete: {
    width: "100%!important"
    //paddingBottom: "15px",
  },

  onlyReadTextField: {
    width: "100%",
    paddingBottom: "15px"
    //  margin: "10px 0",
  },
  cancelButton: {
    backgroundColor: "red",
    color: theme.generalTextColorInHTMLComponents,
    fontWeight: "bold"
  },
  confirmationButton: {
    backgroundColor: "green",
    color: theme.generalTextColorInHTMLComponents,
    fontWeight: "bold"
  },
  modalDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "10px"
    }
  },
  succesDialog: {
    background: "green",
    color: "white"
  },
  errorDialog: {
    background: "red",
    color: "white"
  },
  datePicker: {
    width: "100%!important",
    "& div.MuiOutlinedInput-root": {
      background: "white"
    }
  },
  checkBoxNearTextField: {
    color: theme.secondColor + "!important",
    marginTop: "-20px"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.secondColor
  },
  FabOperationAdd: {
    background: theme.secondColor
  },
  FabOperationDelete: {
    background: "red"
  },
  fabButtonGroup: {
    "& > *": {
      margin: "10px"
    }
  },
  blueButton: {
    color: theme.secondColor
  },
  redButton: {
    color: "red"
  },
  formControl: {
    color: "black"
  },
  speedDial: {
    flexDirection: "row!important",
    "& > button": {
      background: theme.secondColor,

      "&:hover": {
        background: theme.secondColor
      }
    }
  },
  stepperCard: {
    margin: "15px 0px"
  },
  formControlDisabled: {
    color: theme.secondColor
  },
  checkbox: {
    color: theme.secondColor + "!important"
  },
  autocomplete: {
    width: "100%"
  },
  expansionPanel: {
    maxHeight: "30px"
  },
  directionButtonBottom: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },

  directionButtonTop: {
    position: "fixed",

    right: theme.spacing(4)
  },

});

export default CommonStyles;
