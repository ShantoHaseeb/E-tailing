import React, { useEffect, useState } from 'react'
import axios from "axios"

const ShowRequests = () => {
  const [requests, setRequests] = useState([])
  useEffect(()=>{
    const getRequests = async () => {
      const res = await axios.get("http://localhost:8080/requests")
      setRequests(res.data)
    }
    getRequests();
  },[])
  console.log(requests)
  return (
    <div>
      <h1>Requests</h1>
      <div>
        {requests.map(item=>(
          <div key={item._id}>
            <h1>{item.productName}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default ShowRequests