const express = require("express");
const bookingRouter = express.Router();
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/objectId");
const requireRole = require("../middleware/role");
const {
  getAllPendingBooking,
  getBookingById,
  getAllBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  acceptBooking,
  rejectBooking,
  getAllAcceptedBooking,
  getAllAcceptedBookingById,
} = require("../controllers/booking.controller");

bookingRouter.get("/bookings/:id", validateObjectId, getBookingById);
bookingRouter.get("/bookings/", getAllBooking);

bookingRouter.get(
  "/admin/bookings/accepted",
  auth,
  requireRole("admin"),
  getAllAcceptedBooking
);

bookingRouter.get(
  "/admin/bookings/pending",
  auth,
  requireRole("admin"),
  getAllPendingBooking
);

bookingRouter.get(
  "/admin/bookings/accepted/:id",
  auth,
  requireRole("admin"),
  validateObjectId,
  getAllAcceptedBookingById
);

bookingRouter.post("/bookings/:id", auth, createBooking);

bookingRouter.put("/bookings/:id", auth, validateObjectId, updateBooking);

bookingRouter.put(
  "/bookings/:id/accept",
  auth,
  requireRole("admin", "service manager"),
  validateObjectId,
  acceptBooking
);

bookingRouter.put(
  "/bookings/:id/reject",
  auth,
  requireRole("admin", "service manager"),
  validateObjectId,
  rejectBooking
);

bookingRouter.delete("/bookings/:id", auth, validateObjectId, deleteBooking);

module.exports = bookingRouter;
