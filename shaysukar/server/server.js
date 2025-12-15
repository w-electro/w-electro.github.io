const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// In-memory storage for orders (you can replace with a database later)
let orders = [];
let orderIdCounter = 1;

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Send existing orders to newly connected client
    socket.emit('initial-orders', orders);

    // Handle new order from customer
    socket.on('new-order', (orderData) => {
        const newOrder = {
            id: orderIdCounter++,
            ...orderData,
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        orders.push(newOrder);

        // Broadcast to all connected clients (especially barista dashboard)
        io.emit('order-created', newOrder);

        console.log('New order created:', newOrder);
    });

    // Handle order status update from barista
    socket.on('update-order-status', (data) => {
        const { orderId, status } = data;
        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = status;

            // Broadcast to all clients
            io.emit('order-updated', {
                orderId,
                status,
                order: orders[orderIndex]
            });

            console.log(`Order ${orderId} updated to ${status}`);
        }
    });

    // Handle order completion/removal
    socket.on('complete-order', (orderId) => {
        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex !== -1) {
            const completedOrder = orders[orderIndex];
            orders.splice(orderIndex, 1);

            // Broadcast to all clients
            io.emit('order-completed', orderId);

            console.log('Order completed:', completedOrder);
        }
    });

    // Handle clearing all orders
    socket.on('clear-all-orders', () => {
        orders = [];
        io.emit('orders-cleared');
        console.log('All orders cleared');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// REST API endpoints (optional, for non-websocket clients)
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.post('/api/orders', (req, res) => {
    const newOrder = {
        id: orderIdCounter++,
        ...req.body,
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    io.emit('order-created', newOrder);

    res.status(201).json(newOrder);
});

// Serve the HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../menu.html'));
});

app.get('/barista', (req, res) => {
    res.sendFile(path.join(__dirname, '../barista.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🍵 Shay Sukar Server running on port ${PORT}`);
    console.log(`📱 Customer Menu: http://localhost:${PORT}/menu`);
    console.log(`👨‍🍳 Barista Dashboard: http://localhost:${PORT}/barista`);
});
