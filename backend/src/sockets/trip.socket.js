/**
 * Socket.IO handler for CargoBee real-time features:
 * - Driver online/offline status
 * - Trip matching (driver receives new trip requests)
 * - Live GPS location updates from driver → consumer
 * - Trip status events
 */

const User = require('../models/User');

// Map: driverId → socketId  (for targeted messages to drivers)
const driverSockets = new Map();

const initSockets = (io) => {
  io.on('connection', (socket) => {
    const { userId, role } = socket.handshake.auth || {};
    console.log(`🔌 Socket connected: ${socket.id} | user: ${userId} | role: ${role}`);

    // ─── Driver goes online ───────────────────────────────────────────────
    socket.on('driver:join', async ({ driverId }) => {
      driverSockets.set(driverId, socket.id);
      socket.join(`driver:${driverId}`);
      await User.findByIdAndUpdate(driverId, { isOnline: true });
      console.log(`🟢 Driver ${driverId} is online`);
    });

    // ─── Join a trip room (both consumer and driver call this) ─────────────
    socket.on('trip:join', ({ tripId }) => {
      socket.join(`trip:${tripId}`);
      console.log(`Socket ${socket.id} joined trip room: trip:${tripId}`);
    });

    // ─── Driver broadcasts live GPS location ──────────────────────────────
    socket.on('location:update', ({ tripId, lat, lng, driverId }) => {
      // Forward to everyone else in the trip room (i.e., the consumer)
      socket.to(`trip:${tripId}`).emit('location:broadcast', { lat, lng, driverId });

      // Also persist to DB (fire-and-forget)
      if (driverId) {
        User.findByIdAndUpdate(driverId, { currentLocation: { lat, lng } }).exec();
      }
    });

    // ─── Driver accepts a trip (alternate socket path) ─────────────────────
    socket.on('trip:accept', ({ tripId, driver }) => {
      io.to(`trip:${tripId}`).emit('trip:accepted', { tripId, driver });
    });

    // ─── Trip completed notification ──────────────────────────────────────
    socket.on('trip:complete', ({ tripId, fare }) => {
      io.to(`trip:${tripId}`).emit('trip:completed', { tripId, fare });
    });

    // ─── Disconnect handling ─────────────────────────────────────────────
    socket.on('disconnect', async () => {
      console.log(`🔴 Socket disconnected: ${socket.id}`);
      // Mark driver offline if it was their socket
      for (const [driverId, sid] of driverSockets.entries()) {
        if (sid === socket.id) {
          driverSockets.delete(driverId);
          await User.findByIdAndUpdate(driverId, { isOnline: false });
          console.log(`⚫ Driver ${driverId} is now offline`);
          break;
        }
      }
    });
  });
};

module.exports = { initSockets, driverSockets };
