import { query } from "../db/database.js"

export default async function consultarPedidoIntent(params, session) {
   const pedidoDb = await query('SELECT * FROM pedidos WHERE id = ?', [params.numero_pedido])

   if(!pedidoDb || pedidoDb.length == 0)
        return `Desculpe, não encontramos seu pedido. 😕
    Parece que não conseguimos localizar o seu pedido. Verifique se o número ou o nome está correto.
    Se precisar de ajuda, nossa equipe está disponível para assisti-lo!`
    
    const pedido = pedidoDb[0]

    const itens = JSON.parse(pedido.itens)

    const itensMsg = itens.map(i => {
        return `${i.quantidade} ${i.produto}(s) --- R$ ${i.valor_unitario * i.quantidade}`
    }) 
    return `
        Aqui está o seu pedido! 🎉
        Data: ${new Date(pedido.data).toLocaleDateString()}

        ${itensMsg.join('\n')}

        Total: R$ ${pedido.total}
        
        Se você ainda não retirou o seu pedido, dirija-se ao balcão.
        Lembre-se: você tem até 30 minutos da data do pedido para retirá-lo. ⏰
    `
}
