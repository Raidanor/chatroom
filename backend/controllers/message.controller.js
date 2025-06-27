import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReveiverSocketId, io } from "../socket/socket.js"

export const sendMessage = async (req, res) =>
{
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],

            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) conversation.messages.push(newMessage._id)

        // running sequentially
        // await conversation.save() 
        // await newMessage.save() 

        // running in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        // SOCKET IO FUNCTIONLALITY
        const receiverSocketId = getReveiverSocketId(receiverId)
        
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        

        res.status(201).json(newMessage)
    }
    catch (error)
    {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json( { error: "Internal server error (check console)"})   
    }
}

export const getMessages = async(req, res) => {
    try {
        const { id: userToChatWith } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatWith]},
        }).populate("messages") // NOT REFERENCE BUT ACTTUAL MESSAGES

        if (!conversation) return res.status(200).json([])

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({ error: "Internal server error (check console)"})   
    }
}