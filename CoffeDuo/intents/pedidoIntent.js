import { query } from "../db/database.js"
import cache from "../cache.js"

export default async function pedidoIntent(params, session) {
    const produtos = params.produtos
    const quantidades = params.quantidades

    if (!produtos || !quantidades || produtos.length != quantidades.length) {
        return pedidoInvalidoMsg
    }

    const dbProdutos = await query(`SELECT * FROM produtos WHERE nome in (${produtos.map(() => '?').join(', ')})`, produtos)
    const pedido = {
        itens: [],
        total: 0
    }
    const pedidosMsg = []
    for (let i = 0; i < produtos.length; i++) {
        const produtodb = dbProdutos.find(p => p.nome == produtos[i])
        pedido.itens.push({
            produto: produtodb.nome,
            valor_unitario: produtodb.valor,
            quantidade: quantidades[i]
        })
        pedido.total += produtodb.valor * quantidades[i]
        pedidosMsg.push(`${quantidades[i]} ${produtos[i]}(s) --- R$ ${produtodb.valor * quantidades[i]}`)
    }
    cache.add(session, pedido)

    return `Confirmando seu pedido...
${pedidosMsg.join('\n')}
Total: R$ ${pedido.total}
Se estiver tudo certo, é só me avisar e vamos preparar tudo com muito carinho! ☕️🍵`


}

const pedidoInvalidoMsg
    = 'Desculpe, mas não compreendi. Por favor informe o que deseja juntamente com a quantidade, por exemplo: "Gostaria de dois cafés e dois chás"'