import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const green        = '#00AA86'
export const red          = '#D32F2F'
export const darkRed      = '#C1272D'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#212121'
export const grey         = '#FAFAFA'
export const amber        = '#FFF8E1'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

// Palette
export const palette = {
  primary1Color: darkGrey,
  primary2Color: red,
  primary3Color: green,
  secondary1Color: red,
  accent1Color: green,
  textColor: black,
  alternateTextColor: white,
  canvasColor: grey,
  borderColor: grey,
  disabledColor: grey30
}

export default getMuiTheme({ palette })
