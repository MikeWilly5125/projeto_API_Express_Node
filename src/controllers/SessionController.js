// metodos: index, show, update, store, destroy

/*
index: Listagem de sessoes
store: Cria uma sessao
show: Quando queremos listar uma Unica sessao
update: Quando qyeremos atualizar/alterar alguma sessao
destroy: Quando queremos deletar uma sessao
*/

import User from "../models/User";
import * as Yup from 'yup';
class SessionController{

    async store(req, res){
      const schema = Yup.object().shape({
        email: Yup.string().required().email()
      });

      const {email} = req.body; //Desconstrução javaScript

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({error: "Falha na validação"});
      };

      //Verificando se esse usuário ja existe
      let user = await User.findOne({email});

      if(!user){
       user = await User.create({email});
      }

      return res.json(user)
    }

}

export default new SessionController();
