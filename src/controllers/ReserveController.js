import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController{

    async index(req, res){
        const {user_id} = req.headers;

        const reserves = await Reserve.find({user: user_id})//.populate('house')
        console.log(reserves.length)

        res.json({reserves})
    } 

    async store(req, res){

        const {user_id} = req.headers;
        const {house_id} = req.params;
        const {date} = req.body;

        const house = await House.findById(house_id);
        if(!house){
            return res.status(400).json({error: "essa casa não existe!"}); 
        }

        if(house.status !== true){
            return res.status(400).json({error: "Solicitação indisponível!"});
        }

        const user = await User.findById(user_id)
        if(String(user._id) === String(house.user)){

            return res.status(401).json({error: "Solicitação Não autorizada"});

        }

        const reserve = await Reserve.create({
          user: user_id,
          house: house_id,
          date,
        })

        await reserve.populate('house', 'user')

        return res.json(reserve)
    }

    async destroy(req, res){

        const {reserves_id} = req.body

        const reserves = await Reserve.findByIdAndDelete({_id: reserves_id})

        return res.send()

    }



}

export default new ReserveController();