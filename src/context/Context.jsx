import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"

export const ContextApp = createContext()

export function ContextProvider(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "productos"));
                querySnapshot.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                });
                // console.log(list);
                setData(list)
                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [])

    // console.log(data);
    

    // useEffect(() => {
    //     fetch('./src/assets/data.json')
    //         .then(res => res.json())
    //         .then(res => {
    //             setData(res)
    //             setLoading(false)
    //         })
    // }, [])
    
    if (!loading) {
        return (
            <ContextApp.Provider value={data}>
                {props.children}
            </ContextApp.Provider>
        )
    }
}