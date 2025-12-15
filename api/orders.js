// Vercel Serverless Function for Shay Sukar Order Management
// REST API with in-memory storage

// In-memory orders storage (resets on cold start)
let orders = [];
let nextOrderId = 1;

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Content-Type': 'application/json'
};

// Main handler
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.status(200).end();
    return;
  }

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json');

  console.log(`[API] ${req.method} /api/orders - Orders count: ${orders.length}`);

  try {
    switch (req.method) {
      case 'GET':
        // Return all orders
        console.log('[API] GET - Returning orders:', orders.length);
        return res.status(200).json({
          success: true,
          orders: orders,
          count: orders.length,
          nextId: nextOrderId
        });

      case 'POST':
        // Create new order
        const newOrderData = req.body;

        if (!newOrderData || !newOrderData.items || newOrderData.items.length === 0) {
          console.log('[API] POST - Invalid order data');
          return res.status(400).json({
            success: false,
            error: 'Invalid order data - items required'
          });
        }

        if (!newOrderData.tableNumber) {
          console.log('[API] POST - Missing table number');
          return res.status(400).json({
            success: false,
            error: 'Table number is required'
          });
        }

        // API generates the order ID (auto-increment)
        const newOrder = {
          id: nextOrderId++,
          tableNumber: newOrderData.tableNumber,
          customerName: newOrderData.customerName || 'زبون',
          items: newOrderData.items,
          total: newOrderData.total || 0,
          status: 'pending',
          timestamp: new Date().toISOString(),
          createdAt: Date.now()
        };

        orders.push(newOrder);
        console.log(`[API] POST - Created order #${newOrder.id} for table ${newOrder.tableNumber}`);

        return res.status(201).json({
          success: true,
          order: newOrder,
          message: 'Order created successfully'
        });

      case 'PUT':
        // Update order status
        const updateData = req.body;

        if (!updateData || !updateData.orderId || !updateData.status) {
          console.log('[API] PUT - Missing orderId or status');
          return res.status(400).json({
            success: false,
            error: 'orderId and status are required'
          });
        }

        const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
        if (!validStatuses.includes(updateData.status)) {
          console.log('[API] PUT - Invalid status:', updateData.status);
          return res.status(400).json({
            success: false,
            error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
          });
        }

        const orderIndex = orders.findIndex(o => o.id === updateData.orderId);

        if (orderIndex === -1) {
          console.log('[API] PUT - Order not found:', updateData.orderId);
          return res.status(404).json({
            success: false,
            error: 'Order not found'
          });
        }

        orders[orderIndex].status = updateData.status;
        orders[orderIndex].updatedAt = Date.now();

        console.log(`[API] PUT - Updated order #${updateData.orderId} to ${updateData.status}`);

        return res.status(200).json({
          success: true,
          order: orders[orderIndex],
          message: 'Order updated successfully'
        });

      case 'DELETE':
        // Delete order by ID
        const deleteId = parseInt(req.query.id);

        if (!deleteId || isNaN(deleteId)) {
          console.log('[API] DELETE - Missing or invalid id');
          return res.status(400).json({
            success: false,
            error: 'Valid order id is required (use ?id=X)'
          });
        }

        const deleteIndex = orders.findIndex(o => o.id === deleteId);

        if (deleteIndex === -1) {
          console.log('[API] DELETE - Order not found:', deleteId);
          return res.status(404).json({
            success: false,
            error: 'Order not found'
          });
        }

        const deletedOrder = orders.splice(deleteIndex, 1)[0];
        console.log(`[API] DELETE - Removed order #${deleteId}`);

        return res.status(200).json({
          success: true,
          deletedOrder: deletedOrder,
          message: 'Order deleted successfully'
        });

      default:
        console.log('[API] Method not allowed:', req.method);
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('[API] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
}
