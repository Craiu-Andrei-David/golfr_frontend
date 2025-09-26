import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getToken } from '../../lib/userAuth'

const UserPage = () =>{
  const router=useRouter()
  const {id} = router.query
  const [user,setUser]=useState(null)

  useEffect(
    () => {
      if(!id)return 
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },})
        .then(res => res.json())
        .then (data=> setUser(data.user))
        .catch(e=> {alert(e)})
      
    },
    [ id ]
  )

  if(!user)return <Layout>User not found</Layout>

  return ( 
    <Layout>
      <h1 className='text-2xl font-bold mb-4'>{user.name}</h1>
      <p className='mb-4'>Email: {user.email}</p>
      {user.scores.map(score => (
        <div key={score.id} className='p-2 my-2 shadow-md'>
          <div className='italic text-gray-400'>{score.played_at}</div>
          <div> {`${user.name} posted ${score.total_score} (${score.number_of_holes}-holes)`}</div>
        </div>
      ))
      }
    </Layout>
    )
}

export default UserPage