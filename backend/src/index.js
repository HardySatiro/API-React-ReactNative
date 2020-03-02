const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

global.app = express()



mongoose.connect('mongodb+srv://semana:semana@cluster0-qq4sy.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors({origin:'http://localhost:3001'}));
app.use(express.json());
// Principais Metodos para rotas
// Rotas GET['Busca de alguma informação na aplicação: Exemplos: É mais utilizada para listagem de usuarios, busca de apenas um usuario ']
// Rotas POST['Seria o ato de POSTAR algum recurso da aplicação: Exemplo: Adicionar um usuario um produto entre outros']
// Rotas PUT['Seria o ato de EDITAR algum recurso da aplicação: Exemplo: Edição de alguma informação do usuario ou um produto, tais como caracteristica, preço']
// Rotas DELETE['Seria o ato de DELETAR algum recurso da aplicação: Exemplo: Excluir um usuario que foi demito, ou um produto que não é mais vendido']


//Tipos de parâmetros:

// QUERY Params: request.query (UTILIZADOS PARA FILTROS, ORDENAÇÃO E PAGINAÇÃO ENTRE OUTROS) Metodos: Na maioria dos cassos é utilizado o metodo GET, Exemplo: ['É utilizado para busca de algum usuario ou produto']:
// ROUTE Params: request.params Metodos: PUT E DELETE  [' EXEMPLO: Identificar um recurso ou alteração de um determinado usuario ou produto']
// BODY Params: request.bodyMetodos: POST E PUT ['EXEMPLO: É UTILIZADO PARA CRIAÇÃO DE ALGUM USUARIO, onde no compo contém todas as informações para os metodos POST e PUT, pde ser utilizado com JSON']


app.use(routes);


app.listen(3333);