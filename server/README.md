# E-commerce Backend (Basic)

Simple Node.js + Express backend for an e-commerce prototype. Uses MongoDB (via Mongoose).

Quick start

Install dependencies:

```bash
npm install
```

Run in development (restarts on change):

```bash
npm run dev
```

Run production:

```bash
npm start
```

Use MongoDB

Set a `MONGODB_URI` environment variable to point to your MongoDB instance (for example `mongodb://localhost:27017/ecomm`). Seed a sample product with:

```bash
npm run seed
```

API endpoints

- `GET /api/products` - list products
- `GET /api/products/:id` - get product
- `POST /api/products` - create product
- `PUT /api/products/:id` - update product
- `DELETE /api/products/:id` - delete product

- `GET /api/cart` - view cart
- `POST /api/cart` - add to cart ({ productId, quantity })
- `DELETE /api/cart/:productId` - remove from cart
- `PUT /api/cart/:productId` - update quantity

- `POST /api/auth/register` - register user (name, email, password, addresses[])
- `POST /api/auth/login` - login (returns access token in JSON and sets refresh token cookie)
- `POST /api/auth/refresh` - exchange refresh cookie for new access token (rotates refresh token)
- `POST /api/auth/logout` - clear refresh token cookie and revoke it server-side

Notes

- This is a minimal starter. For production, add persistent storage, proper auth, and validation.
