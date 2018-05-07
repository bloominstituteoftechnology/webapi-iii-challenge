
const axios = require('axios');




  export const   fetchingUsers = () => {
    axios.get('http://localhost:5000/users?pass=mellon')
        .then((response, data) => {
            console.log('res', response.data);
            
        })
        .catch(err => console.log(err));
      return response.data;
}


