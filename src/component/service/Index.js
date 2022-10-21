import axios from 'axios'
// const player='Diogo Jota'
 const orderUrl='https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders'
 export const getOrders=()=>{
   return new Promise((resolve,reject)=>{
        const promise= axios.get(orderUrl)
        promise.then((res)=>{
           
             resolve(res)
             console.log('resolve from index ',res)
         }).catch((err)=>{
             console.log('error coming  ',err)
             reject("show error")
         });

    });
  
 }
 const productUrl='https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products'
 export const getProducts=()=>{
   return new Promise((resolve,reject)=>{
        const promise= axios.get(productUrl)
        promise.then((res)=>{
           
             resolve(res.data)
            //  console.log(res)
         }).catch((err)=>{
             console.log('error coming  ',err)
             reject("show error")
         });

    });
  
 }
 const usersUrl='https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users'
 export const getUsers=()=>{
   return new Promise((resolve,reject)=>{
        const promise= axios.get(usersUrl)
        promise.then((res)=>{
           
             resolve(res.data)
             console.log(res)
         }).catch((err)=>{
             console.log('error coming  ',err)
             reject("show error")
         });

    });
  
 }