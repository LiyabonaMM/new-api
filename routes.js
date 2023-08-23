const express = require("express")
const router = express.Router()
const db = require("./db") // Adjust the path

// Create Product
router.post("/products", (req, res) => {
  const { name, price, description } = req.body
  const query =
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)"
  db.query(query, [name, price, description], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Error creating product")
    }
    res.status(201).send("Product created successfully")
  })
})

// See All Products
router.get("/products", (req, res) => {
  const query = "SELECT * FROM products"
  db.query(query, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Error fetching products")
    }
    res.json(result)
  })
})

// See Single Product
router.get("/products/:id", (req, res) => {
  const productId = req.params.id
  const query = "SELECT * FROM products WHERE id = ?"
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Error fetching product")
    }
    if (result.length === 0) {
      return res.status(404).send("Product not found")
    }
    res.json(result[0])
  })
})

// Update Product
router.put("/products/:id", (req, res) => {
  const productId = req.params.id
  const { name, price, description } = req.body
  const query =
    "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?"
  db.query(query, [name, price, description, productId], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Error updating product")
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Product not found")
    }
    res.send("Product updated successfully")
  })
})

// Delete Product
router.delete("/products/:id", (req, res) => {
  const productId = req.params.id
  const query = "DELETE FROM products WHERE id = ?"
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send("Error deleting product")
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Product not found")
    }
    res.send("Product deleted successfully")
  })
})

// Additional Routes for Searching, Sorting, and Filtering can be added here

module.exports = router
