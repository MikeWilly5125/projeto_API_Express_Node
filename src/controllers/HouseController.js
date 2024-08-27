import House from "../models/House";
import User from "../models/User";

class HouseController{

    async index(req, res){

        const {status} = req.query;
        const houses = await House.find({status})

        return res.json(houses)

    };

    async store(req, res){ 
        const {filename} = req.file;
        const {description, price, location, status} = req.body;
        const {user_id} = req.headers;
    
        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })

        return res.json(house)
    };

    async update(req, res){
        const {filename} = req.file;
        const {house_id} = req.params;
        const {description, price, location, status} = req.body;
        const {user_id} = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        console.log(user)
        console.log(houses)

        if(String(user._id) !== String(houses.user)){
            return res.status(401).json({error: "não autorizado."})
        }

        await House.updateOne({_id: house_id}, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })

        return res.send() //retornando send para demonstrar apenas o status code 200

    };

    async destroy(req, res){

        const {house_id} = req.body;
        const {user_id} = req.headers;

        console.log(house_id)
        console.log(user_id)

        await House.findByIdAndDelete({_id: house_id})

        return res.json({message: "Excluida com sucesso"});

    }

    




}


export default new HouseController();