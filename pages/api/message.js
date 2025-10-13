import Message from "@/models/Message";
import dbConnect from "@/services/dbConnect";

export default async function messageHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newMessage = await Message.create(body);
        return res.status(200).json(newMessage);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let message = null;
        if (req.query.id) {
          message = await Message.findById(req.query.id);
        } else {
          message = await Message.find();
        }
        return res.status(200).json(message);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateMessage = await Message.findByIdAndUpdate(
          body.id || body._id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateMessage) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateMessage);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedMessage = await Message.findByIdAndDelete(req.query.id);
        if (!deletedMessage) {
          return res.status(404).json({ msg: "Message not found" });
        }
        return res.status(200).json({ msg: "Message deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
