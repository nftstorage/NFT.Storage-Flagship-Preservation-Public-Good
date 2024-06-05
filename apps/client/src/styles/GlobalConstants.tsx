export const commonStyle: any = {
  font: {
    h1: "2.2rem",
    h2: "2rem",
    h3: "1.6rem",
    h4: "1.4rem",
    h5: "1.2rem",
    h6: "1rem",
    h7: "0.8rem",
    h8: "0.65rem",
    p: "1rem",
  },
  fontWeight: {
    light: "200",
    medium: "400",
    dark: "600",
    default: "400",
    extraDark: "800",
  },
  margin: {
    xxxs: "0.2rem",
    xxs: "0.5rem",
    xs: "1rem",
    sm: "1.2rem",
    md: "1.5rem",
    lg: "1.8rem",
    xl: "2.4rem",
    xxl: "3.2rem",
    xxxl: "4rem",
    "4xl": "6rem",
    "5xl": "8rem",
    nav: "50px",
    subnav: "60px",
  },
  padding: {
    xxxs: "0.25rem",
    xxs: "0.5rem",
    xs: "1rem",
    sm: "1.2rem",
    md: "1.5rem",
    lg: "1.8rem",
    xl: "2.4rem",
    xxl: "3.2rem",
    xxxl: "4rem",
  },
  color: {
    primary: "#F5C32C",
    secondary: "#fff",
    lightSecondry: "#FCECBE",
    darkSecondary: "#F8D772",
    textPrimary: "#AE8A1F",
    primaryCyan: "#C6E6F3",
    secondaryCyan: "#47AED7",
    dullText: "#667085",
    bgGreen: "#E9FAEF",
    textGreen: "#075E36",
  },
};

export const darkStyle = {
  bgLayout: { primary: "#181A20", secondry: "#111315" },
  brButton: { active: "#2A85FF" },

  flex: {
    justifyContent: {
      hrCenter: "center",
      hrBetween: "space-between",
    },
  },
  header: {
    bg: { default: "#00040d" },
    border: { default: "1px solid #0F172E" },
  },
  window: {},
  body: {
    bg: { default: "#000511" },
    bgLight: { default: "rgba(230, 238, 248, 1)" },
    padding: "1% 6%",
    margin: { top: "50px" },
    paddingTop: "80px",
  },
  nav: {
    width: "100%",
    widthLeft: "18%",
    height: "65px",
    heightFooter: "85px",
    bg: { default: "#00040d", meta: "#000A24" },
    border: {
      default: "2px solid #0F172E",
      light: "1px solid black",
    },
    padding: { default: "1% 6%", meta: "1% 2%" },
    margin: "75px",
    marginM: "120px",
    navLeftBg: "#030c1a",
    navLeftBgLight: "#f0f0f0",
  },
  list: {
    padding: "5px",
    bg: {
      default: "transparent",
      hover:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
    },
    shadow: {
      default: "",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
  },
  card: {
    bg: {
      default: "#000511",
      // default:
      //   " linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      highlight:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      hover:
        "linear-gradient(141.09deg, rgba(13, 25, 65, 0.5) 11.08%, rgba(0, 20, 60, 0.38) 89.68%)",

      overview: "#000511",
      brand: "linear-gradient(100.07deg, #2A85FF 0.39%, #2448C7 73.45%)",
    },
    border: {
      default: "1px solid #111a34",
      card: "1px solid #102540",
      hover: "1px solid #285ddf",
      meta: "1px solid #197cec",
      mcard: "1px solid #353c54",
      contract: "1px solid #061133",
      publisher: "1px solid rgba(8,78,156,0.5)",
      disabled: "1px solid #1B2D59",
      transparent: "1px solid transparent",
    },
    borderRadius: {
      default: "20px",
      image: "14px",
      button: "10px",
    },
    shadow: {
      default: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    padding: { default: "16px", overview: "26px" },
    margin: { default: "2.1rem", right: "3rem" },
    width: {
      meta: "30%",
    },
    cursor: { default: "pointer" },
  },
  pannel: { bg: { default: "" }, shadow: { default: "" } },
  input: {
    bg: {
      default: "#000511",
      active:
        "linear-gradient(141.09deg, rgba(10, 19, 51, 0.5) 11.08%, rgba(0, 15, 44, 0.38) 89.68%);",
    },
    shadow: {
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    border: {
      default: "1px solid  #0F172E",
      active: "1px solid rgba(15,23,46,1)",
      search: "2px solid #0F172E",
    },
    placeholder: {
      color: "#132041",
    },
    borderRadius: {
      default: "10px",
    },
  },
  message: {
    bg: {
      default:
        "linear-gradient(141.09deg, rgba(10, 19, 51, 0.5) 11.08%, rgba(0, 15, 44, 0.38) 89.68%);",
      active: "#246BFD",
    },
    color: {
      default: "rgb(255, 255, 255)",
      heading: {
        color: {
          default: "#246bfd",
          active: "#FFF",
        },
      },
    },
    shadow: {
      default:
        "0px -2px 8px rgba(19, 112, 231, 0.05), 0px 2px 8px rgba(19, 112, 231, 0.05)",
      hover:
        "0px -2px 8px rgba(19, 112, 231, 0.15), 0px 2px 8px rgba(19, 112, 231, 0.15)",
    },
  },
  modal: {
    bg: {
      default: "#020A21",
      overlay: "#00040d",
      contractModal: "#030c1a",
    },
    border: {
      default: "1px solid #0F172E",
      contract: "1px solid #102540",
      hover: "2px solid rgba(15,23,46,1)",
      meta: "1px solid #197cec",
      mcard: "1px solid #353c54",
      // contract: "1px solid #061133",
    },
    shadow: { default: "" },
    borderRadius: "1.4rem",
    padding: "2rem",
    margin: "75px auto",
    width: "80%",
    bgOverlay: "#000320",
  },
  popover: { bg: { default: "#000416" } },
  sidebar: {},
  dropdown: {
    bg: {
      transparent: "transparent",
      default: "#00040d",
      hover: "#000C29",
      active: "linear-gradient(100.07deg, #2A85FF 0.39%, #2448C7 73.45%)",
      activeTranslucent:
        "linear-gradient(99.21deg, rgba(55, 121, 249, 0.66) 2.04%, rgba(28, 76, 244, 0.2) 95.15%);",
      disabled: "",
    },
    border: "1px solid rgba(247,248,248,0.1)",
    padding: "1.3rem",
    shadowDropdown:
      "rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px",
  },
  avatar: {
    border: "2px solid #246bfd",
  },
  icon: {
    bg: {
      transparent: "transparent",
      default:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      hover:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      active: "red",
    },
    borderRadius: "12px",
    shadow: {
      default: "inset 0 1px 0 0 hsl(0deg 0% 100% / 5%)",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    sizes: {
      default: "1.25rem",
      "3xs": "0.62rem",
      "2xs": "0.75rem",
      xs: "1rem",
      sm: "1.125rem",
      md: "1.25rem",
      lg: "1.56rem",
      xl: "2rem",
      "2xl": "3.1rem",
      "3xl": "4.6rem",
      "4xl": "6.25rem",
    },
  },
  button: {
    bg: {
      transparent: "transparent",
      default: "#00040d",
      hover: "#000C29",
      active: "linear-gradient(100.07deg, #2A85FF 0.39%, #2448C7 73.45%)",
      activeTranslucent:
        "linear-gradient(99.21deg, rgba(55, 121, 249, 0.66) 2.04%, rgba(28, 76, 244, 0.2) 95.15%);",
      disabled: "",
      warning: "#C62424",
    },
    border: { active: "2px solid #2448c7" },
    color: { default: "#EFEFEF", active: "#2448c7" },
    margin: { default: "5px" },
    borderRadius: {
      default: "0.5rem",
      sm: "1rem",
    },
  },
  loader: {
    bg: {
      start: "#000416",
      end: "#001E57",
    },
  },
  table: {
    bg: {
      default:
        " linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      hover:
        "linear-gradient(141.09deg, rgba(10, 19, 51, 0.5) 11.08%, rgba(0, 15, 44, 0.38) 89.68%)",
    },
    borderColor: {
      default: "#14244b",
    },

    border: {
      thead: "1px solid #1b2d59",
    },
    Th: {
      borderBottomColor: "#14244b",
      borderRightColor: "#14244b",
      borderWidth: "1px",
      paddingTop: "20px",
      paddingBottom: "20px",
      textAlign: "start",
      color: "white",
      fontWeight: "600",
      fontSize: "1rem",
      borderCollapse: "separate",
      borderSpacing: "0 1rem",
    },
    Td: {
      borderColor: "#14244b",
      borderWidth: "1px",
      textAlign: "start",
      color: "white",
      padding: "10px 24px",
    },
    cursor: {
      default: "",
      pointer: "pointer",
    },
  },
};

export default { ...commonStyle, ...darkStyle };
