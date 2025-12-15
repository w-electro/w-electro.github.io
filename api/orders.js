// Vercel Serverless Function for Orders
// This stores orders in memory (will reset on cold start)
// For production, use a database like Vercel KV, Supabase, or MongoDB

let orders = [];
let orderIdCounter = 1;

// Enable CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    // Add CORS headers to all responses
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // GET - Fetch all orders
    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            orders: orders,
            count: orders.length
        });
    }

    // POST - Create new order
    if (req.method === 'POST') {
        const orderData = req.body;

        const newOrder = {
            id: orderIdCounter++,
            ...orderData,
            status: orderData.status || 'pending',
            timestamp: new Date().toISOString()
        };

        orders.push(newOrder);

        return res.status(201).json({
            success: true,
            order: newOrder,
            message: 'Order created successfully'
        });
    }

    // PUT - Update order status
    if (req.method === 'PUT') {
        const { orderId, status } = req.body;

        const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));

        if (orderIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();

        return res.status(200).json({
            success: true,
            order: orders[orderIndex],
            message: 'Order updated successfully'
        });
    }

    // DELETE - Complete/remove order
    if (req.method === 'DELETE') {
        const orderId = parseInt(req.query.id || req.body.orderId);

        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const completedOrder = orders[orderIndex];
        orders.splice(orderIndex, 1);

        return res.status(200).json({
            success: true,
            order: completedOrder,
            message: 'Order completed successfully'
        });
    }

    // Method not allowed
    return res.status(405).json({
        success: false,
        message: 'Method not allowed'
    });
}
