import consultarPedidoIntent from "./intents/consultarPedidoIntent.js";
import pedidoConfirmadoIntent from "./intents/pedidoConfirmadoIntent.js";
import pedidoIntent from "./intents/pedidoIntent.js";

const intentMap = {
    'Pedido': pedidoIntent,
    'Pedido - yes': pedidoConfirmadoIntent,
    'Consultar Pedido': consultarPedidoIntent
}
const mapIntent = (intent) => intentMap[intent]
export default mapIntent