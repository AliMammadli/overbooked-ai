'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'


export default function Promotions() {
    const [userID, setUserID] = useState('')
    const [promotions, setPromotions] = useState([])
    const [response, setResponse] = useState('')


    const submit = async () => {
        setResponse('')
        setPromotions([])

        const res = await fetch(`http://localhost:3000/api/users/${userID}/recommendations`)
        const data = await res.json()

        if (data.error) return setResponse(data.error)
        setPromotions(data.promotions)
    }


    return (
        <div className='flex flex-col gap-2'>
            {response && <div className='flex flex-col items-center mb-10'>
                <h1 className='text-yellow-500 text-xl'>{response}</h1>
            </div>}
            <div className='flex items-center'>
                <label className='flex flex-nowrap w-full mr-4'>User ID</label>
                <Input type='text' placeholder='12345' className='w-30' value={userID} onChange={(e) => setUserID(e.target.value)} />
                <Button className='ml-2' onClick={submit}><Search /></Button>
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                {promotions.length !== 0 && promotions.map((promotion, index) => {
                    return (
                        <div className='bg-blue-200 px-5 py-2 rounded-xl' key={index}>
                            <h1 className='text-blue-600'>{promotion}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}