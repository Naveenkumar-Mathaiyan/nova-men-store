# NOVA MEN — Menswear Commerce Demo

A responsive sample men's shirt/trouser store with customer checkout, admin dashboard, size-level inventory, POS billing, invoices and sales metrics.

## Demo admin
- Username: `admin`
- Password: `admin123`

> Demo-only browser login. Replace with server-side authentication before production use.

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000

## Test
```bash
npm test
```

## Features
- Customer storefront: shirts/trousers, sizes, stock, cart, checkout
- Inventory: SKU, color, size stock, cost and selling price, manual adjustment
- Billing/POS: walk-in billing, Cash/UPI/Card, discount, 5% sample GST calculation
- Automatic stock deduction after successful order/bill
- Printable invoice and invoice history
- Admin dashboard: products, stock, invoice count, revenue and low-stock count
- Responsive desktop/mobile UI

## Hosting
This Node/Express project can be pushed directly to GitHub. Deploy to a Node-capable host such as Render/Railway, or adapt it for Vercel serverless. Build command: `npm install`; start command: `npm start`.

## Important production upgrades
The sample intentionally keeps data in memory, so it resets when the server restarts. Before using for a real shop, add PostgreSQL/MySQL, proper authenticated admin accounts, GST configuration appropriate to the business, invoice persistence, product image storage, backups and a payment gateway.
