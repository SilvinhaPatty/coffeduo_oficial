import { insert, query } from "../db/database.js"
import cache from "../cache.js"

export default async function pedidoConfirmadoIntent(params, session) {
  const pedido = cache.get(session)
  if (!pedido) return "Tivemos um problema com o seu pedido. Por favor tente novamente."

  const numero_pedido = await insert('INSERT INTO pedidos(itens, total, data) VALUES (?, ?, ?)', [JSON.stringify(pedido.itens), pedido.total, new Date()])
  cache.remove(session)
  return `Perfeito! 🎉
  O número do seu pedido é ${numero_pedido.id}. Anote bem esse número pois você vai precisar dele para retirar o pedido! 😉
Você já pode se dirigir ao balcão para fazer o pagamento e retirar seu pedido. 💳☕️

Lembre-se: O limite para retirar seu pedido é de 30 minutos a partir de agora. ⏰

Aguardamos sua visita e esperamos que aproveite a experiência no Coffee Duo! 😄
`
}
