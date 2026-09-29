const express=require('express'); const path=require('path');
const app=express(); app.use(express.json()); app.use(express.static(path.join(__dirname,'public')));
let products=[
{id:1,sku:'SH-001',name:'Oxford Cotton Shirt',cat:'Shirts',price:1499,cost:820,color:'Sky Blue',sizes:{S:6,M:12,L:10,XL:7,XXL:3},emoji:'👔'},
{id:2,sku:'SH-002',name:'Premium Linen Shirt',cat:'Shirts',price:1799,cost:990,color:'Sage Green',sizes:{S:4,M:8,L:9,XL:5,XXL:2},emoji:'👕'},
{id:3,sku:'PT-001',name:'Tailored Chino Trouser',cat:'Trousers',price:1899,cost:1050,color:'Charcoal',sizes:{30:4,32:10,34:12,36:7,38:3},emoji:'👖'},
{id:4,sku:'PT-002',name:'Classic Formal Trouser',cat:'Trousers',price:2199,cost:1210,color:'Navy',sizes:{30:3,32:7,34:9,36:8,38:4},emoji:'👖'}];
let orders=[]; let nextOrder=1001;
const stock=p=>Object.values(p.sizes).reduce((a,b)=>a+b,0);
app.get('/api/products',(req,res)=>res.json(products));
app.get('/api/dashboard',(req,res)=>res.json({products:products.length,stock:products.reduce((a,p)=>a+stock(p),0),orders:orders.length,revenue:orders.reduce((a,o)=>a+o.total,0),lowStock:products.filter(p=>stock(p)<15).length}));
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/products',(req,res)=>{let p={id:Date.now(),...req.body}; products.push(p);res.status(201).json(p)});
app.put('/api/products/:id',(req,res)=>{let i=products.findIndex(p=>p.id==req.params.id); if(i<0)return res.sendStatus(404); products[i]={...products[i],...req.body};res.json(products[i])});
app.delete('/api/products/:id',(req,res)=>{products=products.filter(p=>p.id!=req.params.id);res.sendStatus(204)});
app.post('/api/orders',(req,res)=>{let {items,customer='Walk-in Customer',payment='UPI',discount=0}=req.body; let lines=[]; for(const x of items){let p=products.find(p=>p.id==x.id); if(!p||!p.sizes[x.size]||p.sizes[x.size]<x.qty)return res.status(400).json({error:`Insufficient stock for ${p?.name||'product'} ${x.size}`}); lines.push({id:p.id,sku:p.sku,name:p.name,size:x.size,color:p.color,qty:x.qty,price:p.price,total:p.price*x.qty});} lines.forEach(l=>products.find(p=>p.id==l.id).sizes[l.size]-=l.qty); let subtotal=lines.reduce((a,l)=>a+l.total,0), disc=Math.min(Number(discount)||0,subtotal), taxable=subtotal-disc, gst=+(taxable*0.05).toFixed(2), total=+(taxable+gst).toFixed(2); let o={id:`NV-${nextOrder++}`,date:new Date().toISOString(),customer,payment,items:lines,subtotal,discount:disc,gst,total,status:'Paid'};orders.unshift(o);res.status(201).json(o)});
app.get('/*splat',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
if(require.main===module) app.listen(process.env.PORT||3000,()=>console.log('NOVA MEN running at http://localhost:'+(process.env.PORT||3000)));
module.exports={app,getProducts:()=>products,getOrders:()=>orders};
