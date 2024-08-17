import Conversation from "../models/conversation.model.js"

export const sendMessage = async (req, res) =>
{
    try
    {
        const { message } = req.body
        const { id } = req.params
        const { senderId } = req.user._Id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if (!conversation) {
            consversation = await Conversation.create({
                participant: [senderId, receiverId],

            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage)
        {
            conversation.messages.push(newMessage._id)
        }

        res.status(201).json( newMessage )
    }
    catch (error)
    {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json( { error: "Internal server error (check console)"})   
    }
}