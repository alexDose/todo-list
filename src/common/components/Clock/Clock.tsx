import { useEffect, useState } from 'react'
import s from './Clock.module.css'

export const Clock = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <>
            <span className={s.clock}>{date.toLocaleTimeString()}</span>
        </>
    )
}
