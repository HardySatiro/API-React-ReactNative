const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


//O controler podera ter apenas 5 funcões

// index: listagem de usuairos
// show: Listagem de apenas um usuario
// store: Criar usuario
// update: Alterar informações do usuario
// destroy: Deletar usuario


module.exports = {
    
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async strore(request, response){

        const { github_username, techs, latitude, longitude } = request.body;
        
        console.log(github_username);
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio} = apiResponse.data;
            //map para percorrer o vetor e o trim para manter somente o texto excluindo os espaços
        
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
        
            })

        }
        
        return response.json(dev);
    },

    async update(request, response){
        
        const { github_username, name, techs, bio, avatar_url, latitude, longitude} = request.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const techsArray = parseStringAsArray(techs);

        let devup = await Dev.findOneAndUpdate(
            { "github_username" : github_username },
            { $set: { "name" : name, "techs": techsArray, "bio": bio, "avatar_url": avatar_url, "location": location}},
        );
        
        // ATUALIZAR UM UNICO DEV
        //ATT NOME, AVATARURL ,BIO LOCALIZACAO, TECNOLOGIAS
        return response.json(devup);
    },

    async destroy(request, response){

        const { github_username } = request.query;
        let devup = await Dev.findOneAndDelete({ "github_username" : github_username });
        
        console.log(github_username);
        // ATUALIZAR UM UNICO DEV
        //ATT NOME, AVATARURL ,BIO LOCALIZACAO, TECNOLOGIAS
        return response.json(devup);


    }


}