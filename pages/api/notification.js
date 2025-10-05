import Notification from "@/models/Notification";
import dbConnect from "@/services/dbConnect";

export default async function notificationHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newNotification = await Notification.create(body);
        return res.status(200).json(newNotification);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let notification = null;
        if (req.query.id) {
          notification = await Notification.findById(req.query.id);
        } else {
          notification = await Notification.find();
        }
        return res.status(200).json(notification);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateNotification = await Notification.findByIdAndUpdate(
          body.id || body._id,
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateNotification) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateNotification);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedNotification = await Notification.findByIdAndDelete(
          req.query.id
        );
        if (!deletedNotification) {
          return res.status(404).json({ msg: "Notification not found" });
        }
        return res
          .status(200)
          .json({ msg: "Notification deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
