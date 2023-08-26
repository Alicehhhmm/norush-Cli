import figlet from "figlet";
import { LOGOFONT } from "./constants";
import { lightCyan } from 'kolorist'

export default async () => {
  console.log(
    lightCyan(
      figlet.textSync(LOGOFONT, {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
  console.log('----------------------------------------------------------------')
}


