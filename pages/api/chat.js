import Chat from "@/models/Chat";
import dbConnect from "@/services/dbConnect";

export default async function chatHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newChat = await Chat.create(body);
        return res.status(200).json(newChat);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let chat = null;
        if (req.query.id) {
          chat = await Chat.findById(req.query.id);
        } else {
          chat = await Chat.find();
        }
        return res.status(200).json(chat);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateChat = await Chat.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateChat) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateChat);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedChat = await Chat.findByIdAndDelete(req.query.id);
        if (!deletedChat) {
          return res.status(404).json({ msg: "Chat not found" });
        }
        return res.status(200).json({ msg: "Chat deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
