export default {
  phoneRegExp: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  rucRegExp: /^[0-9]{11,11}$/,
  dniRegExp: /^[0-9]{8,8}$/,
  // carnetExtRegExp: /\d{1,23}[-]{0,2}[a-zA-Z0-9][a-zA-Z0-9]/,
  carnetExtRegExp: /^[0-9]{12,12}$/,
  // passportRegExp: /^(?!^0+$)[a-zA-Z0-9]{6,9}$/,
  passportRegExp: /^[0-9]{12,12}$/,
  generalRegExp: /^[0-9]{8,12}$/,
  onlyNumbers: /^\d+$/,
  priceRegExp: /^\d+(\.\d{0,2})?$/,
}