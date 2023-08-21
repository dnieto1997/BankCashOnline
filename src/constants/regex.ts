/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name: RegExp = /[a-zA-Z\ ]{3,15}/;

export const lastname: RegExp = /[a-zA-Z\ ]{3,15}/;
export const numdoc: RegExp = /^[0-9]{3,30}$/;
/* export const country: RegExp = /[a-zA-Z\ ]{3,15}/; */
export const country: RegExp =/^[0-9]{1,2}$/;
export const city: RegExp = /[a-zA-Z\ ]{3,15}/;
export const phone: RegExp = /^[0-9]{3,30}$/;
export const address: RegExp = /[a-zA-Z\ ]{3,30}/;
export const postcode: RegExp = /^[0-9]{1,5}$/;


/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
