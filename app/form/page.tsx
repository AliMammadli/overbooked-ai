'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useState } from 'react'


export default function Form() {
    const [userID, setUserID] = useState('')
    const [interests, setInterests] = useState([''])
    const [response, setResponse] = useState('')


    const addInterest = () => {
        setInterests([...interests, ''])
    }

    const removeInterest = (index: number) => {
        const temp = [...interests]
        temp.splice(index, 1)
        setInterests(temp)
    }

    const onChange = (index: number, value: string) => {
        const temp = [...interests]
        temp[index] = value
        setInterests(temp)
    }

    const submit = async () => {
        const body = JSON.stringify({ clientId: userID, productInterests: interests })
        const res = await fetch('http://localhost:3000/api/recommendations', { method: 'POST', body })
        const data = await res.json()

        if (data.error) return setResponse(data.error)
        setResponse('Interests added')
    }


    return (
        <div className='flex flex-col gap-2'>
            {response && <div className='flex flex-col items-center mb-10'>
                <h1 className='text-yellow-500 text-xl'>{response}</h1>
            </div>}
            <div className='flex items-center'>
                <label className='flex flex-nowrap w-full mr-4'>User ID</label>
                <Input type='text' placeholder='12345' className='w-30' value={userID} onChange={(e) => setUserID(e.target.value)} />
            </div>

            {interests.map((interest, index) => {
                return (
                    <div className='flex items-center justify-end' key={index}>
                        {index === 0 && <label className='flex flex-nowrap w-full mr-4'>Interests</label>}
                        {index !== 0 && <Button className='flex mr-2' variant='ghost' onClick={() => removeInterest(index)}><CircleMinus size={20} /></Button>}
                        <Input type='text' placeholder={`Interest ${index + 1}`} className='w-30' value={interest} onChange={(e) => onChange(index, e.target.value)} />
                    </div>
                )
            })}

            {interests.length < 3 && <Button className='mt-2 w-min self-center' variant='outline' onClick={addInterest}><CirclePlus size={20} /></Button>}

            <Button className='mt-10' onClick={submit}>Submit</Button>
        </div>
    )
}