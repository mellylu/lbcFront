// import React, { useEffect, useState } from "react"
// import Button from "../../components/body/button/button"
// import styles from "./index.module.scss"
// import { io } from "socket.io-client"
// const socket = io("http://localhost:3000", { transports: ["websocket"] })

// export default function Index() {
//     const [champ1, setChamp1] = useState("")
//     const [champ2, setChamp2] = useState("")
//     const [name, setName] = useState("")
//     const [id, setId] = useState("")
//     const [message, setMessage] = useState([])

//     const handlepost = e => {
//         socket.emit("send message", { post: name })
//     }

//     useEffect(() => {})
//     socket.on("your id", data => {
//         setId(data)
//     })
//     socket.on("message", data => {
//         setMessage([...message, data])
//     })
//     //const xx = "http://localhost:3000/message/socket.io/socket.io.js"

//     useEffect(() => {
//         // fetch(`http://localhost:5000/api/v1/message/`, {
//         //     method: "GET",
//         //     headers: {
//         //         "content-type": "application/json",
//         //     },
//         // })
//         // const xx = "http://localhost:3000/socket.io/socket.io.js"
//         // console.log(io())
//     }, [])
//     // const sendMessage = () => {
//     //     let socket = io.connect("http://adresseServeurNode:portEcouteSocketIO")
//     //     socket.emit("monTypeDeMessage", { champ1: champ1, champ2: champ2 })
//     //     socket.on("ack", function (data) {
//     //         console.log("ack reçu")
//     //     })
//     // }

//     return (
//         <div>
//             <input type="text" onChange={e => setName(e.target.value)} />
//             <button onClick={() => handlepost}>Send massage </button>
//             <p>Recive message {id}</p>
//             {message.map((p, index) => (
//                 <li key={index}>{p}</li>
//             ))}
//             {/* <h1>Socket.IO chat</h1>
//             <div className={styles.body}>
//                 <ul className={styles.ul} id="messages"></ul>
//                 <form className={styles.form} id="form" action="">
//                     <input className={styles.input} id="input" autocomplete="off" />
//                     <button className={styles.button}>Send</button>
//                 </form>
//             </div> */}
//             {/* <label>Champ 1</label>
//             <input type="text" id="champ1" onChange={e => setChamp1(e.target.value)}></input>
//             <br />
//             <label>Champ 2</label>
//             <input type="text" id="champ2" onChange={e => setChamp2(e.target.value)}></input>
//             <Button title="Envoyer message" onClick={() => sendMessage()} /> */}
//         </div>
//     )
// }
