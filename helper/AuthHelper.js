const {User} = require('../models')
var ApiResonse=require('./ApiResponse')

 
module.exports={
  async GetCurrentUser(req){
    try {
      let token= req.headers['authorization'];
     
      let currentUser = await User.findOne({ where:{ token: token } });
      if(currentUser){
        return currentUser;
      }else{
        ApiResonse.setError('User not Found');
        return res.status(401).json(ApiResonse);
      }
    } catch (e) {
      ApiResonse.setError('Generate UserError:'+ e);
      return res.status(500).json(ApiResonse);
      
    }


 } 
}


