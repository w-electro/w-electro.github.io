import { NextRequest, NextResponse } from 'next/server';

// In-memory orders storage (resets on cold start)
// NOTE: This works on Vercel but orders may be lost when functions cold start
// For production, use a database like Supabase
let orders: any[] = [];
let nextOrderId = 1;

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// OPTIONS /api/orders - Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

// GET /api/orders
export async function GET() {
  console.log(`[API] GET /api/orders - Returning ${orders.length} orders`);

  return NextResponse.json({
    success: true,
    orders: orders,
    count: orders.length,
    nextId: nextOrderId
  }, { headers: corsHeaders });
}

// POST /api/orders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.items || body.items.length === 0) {
      console.log('[API] POST - Invalid order data');
      return NextResponse.json(
        { success: false, error: 'Invalid order data - items required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!body.tableNumber) {
      console.log('[API] POST - Missing table number');
      return NextResponse.json(
        { success: false, error: 'Table number is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // API generates the order ID (auto-increment)
    const newOrder = {
      id: nextOrderId++,
      tableNumber: body.tableNumber,
      customerName: body.customerName || 'زبون',
      items: body.items,
      total: body.total || 0,
      status: 'pending',
      timestamp: new Date().toISOString(),
      createdAt: Date.now()
    };

    orders.push(newOrder);
    console.log(`[API] POST - Created order #${newOrder.id} for table ${newOrder.tableNumber}`);

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('[API] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to parse request body' },
      { status: 400, headers: corsHeaders }
    );
  }
}

// PUT /api/orders
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.orderId || !body.status) {
      console.log('[API] PUT - Missing orderId or status');
      return NextResponse.json(
        { success: false, error: 'orderId and status are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(body.status)) {
      console.log('[API] PUT - Invalid status:', body.status);
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400, headers: corsHeaders }
      );
    }

    const orderIndex = orders.findIndex(o => o.id === body.orderId);

    if (orderIndex === -1) {
      console.log('[API] PUT - Order not found:', body.orderId);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    orders[orderIndex].status = body.status;
    orders[orderIndex].updatedAt = Date.now();

    console.log(`[API] PUT - Updated order #${body.orderId} to ${body.status}`);

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
      message: 'Order updated successfully'
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('[API] PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to parse request body' },
      { status: 400, headers: corsHeaders }
    );
  }
}

// DELETE /api/orders?id=X
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const deleteId = parseInt(id || '');

  if (!deleteId || isNaN(deleteId)) {
    console.log('[API] DELETE - Missing or invalid id');
    return NextResponse.json(
      { success: false, error: 'Valid order id is required (use ?id=X)' },
      { status: 400, headers: corsHeaders }
    );
  }

  const deleteIndex = orders.findIndex(o => o.id === deleteId);

  if (deleteIndex === -1) {
    console.log('[API] DELETE - Order not found:', deleteId);
    return NextResponse.json(
      { success: false, error: 'Order not found' },
      { status: 404, headers: corsHeaders }
    );
  }

  const deletedOrder = orders.splice(deleteIndex, 1)[0];
  console.log(`[API] DELETE - Removed order #${deleteId}`);

  return NextResponse.json({
    success: true,
    deletedOrder: deletedOrder,
    message: 'Order deleted successfully'
  }, { headers: corsHeaders });
}
