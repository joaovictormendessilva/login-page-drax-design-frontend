import * as yup from "yup";
import {
  enterAtLeastCharacters,
  enterAValidEmail,
  emailIsRequired,
  passwordIsRequired,
} from "../../../utils/validation-messages";
import { minPasswordCharacters } from "../utils/min-password-characters";

export const schema = yup.object().shape({
  email: yup.string().email(enterAValidEmail).required(emailIsRequired),
  password: yup
    .string()
    .required(passwordIsRequired)
    .min(minPasswordCharacters, enterAtLeastCharacters(minPasswordCharacters)),
});
