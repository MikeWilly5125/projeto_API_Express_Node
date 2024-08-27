// metodos: index, show, update, store, destroy

/*
index: Listagem de sessoes
store: Cria uma sessao
show: Quando queremos listar uma Unica sessao
update: Quando qyeremos atualizar/alterar alguma sessao
destroy: Quando queremos deletar uma sessao
*/

import User from "../models/User"

class SessionController{

    async store(req, res){
     // const email = req.body.email
      const {email} = req.body //Desconstrução javaScript

    //   Verificando se esse usuário ja existe
      let user = await User.findOne({email})

      if(!user){

       user = await User.create({email});
      }

        return res.json(user)
    }

}

export default new SessionController();
