// REST API Metadata Definitions
const endpoints = [
  // Authentication
  {
    id: "auth-register",
    module: "auth",
    name: "Register User",
    method: "POST",
    path: "/api/auth/register",
    description: "Registers a new user account with hashed password.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" }
    ],
    params: [],
    bodySchema: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securepassword123"
    },
    responseSchema: {
      success: true,
      message: "User registered successfully",
      data: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "USER",
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z"
      }
    }
  },
  {
    id: "auth-login",
    module: "auth",
    name: "User Login",
    method: "POST",
    path: "/api/auth/login",
    description: "Authenticates a user and returns a JWT token.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" }
    ],
    params: [],
    bodySchema: {
      email: "john.doe@example.com",
      password: "securepassword123"
    },
    responseSchema: {
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "USER",
          isDeleted: false,
          createdAt: "2026-08-11T13:40:00.000Z",
          updatedAt: "2026-08-11T13:40:00.000Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  },

  // Users
  {
    id: "users-create",
    module: "users",
    name: "Create User (Admin)",
    method: "POST",
    path: "/api/users",
    description: "Creates a new user record. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securepassword456",
      role: "ADMIN"
    },
    responseSchema: {
      success: true,
      message: "User created successfully",
      data: {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "ADMIN",
        isDeleted: false,
        createdAt: "2026-08-11T13:41:00.000Z",
        updatedAt: "2026-08-11T13:41:00.000Z"
      }
    }
  },
  {
    id: "users-get-all",
    module: "users",
    name: "Get All Users",
    method: "GET",
    path: "/api/users",
    description: "Retrieves all active (non-deleted) users. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Users retrieved successfully",
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "USER",
          isDeleted: false,
          createdAt: "2026-08-11T13:40:00.000Z",
          updatedAt: "2026-08-11T13:40:00.000Z"
        }
      ]
    }
  },
  {
    id: "users-get-id",
    module: "users",
    name: "Get User by ID",
    method: "GET",
    path: "/api/users/:id",
    description: "Retrieves a single user record by their ID. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique user ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "User retrieved successfully",
      data: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "USER",
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z"
      }
    }
  },
  {
    id: "users-update",
    module: "users",
    name: "Update User",
    method: "PATCH",
    path: "/api/users/:id",
    description: "Modifies user credentials or profile fields. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique user ID" }
    ],
    bodySchema: {
      name: "John Updated",
      role: "ADMIN"
    },
    responseSchema: {
      success: true,
      message: "User updated successfully",
      data: {
        id: 1,
        name: "John Updated",
        email: "john.doe@example.com",
        role: "ADMIN",
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:45:00.000Z"
      }
    }
  },
  {
    id: "users-delete",
    module: "users",
    name: "Delete User",
    method: "DELETE",
    path: "/api/users/:id",
    description: "Performs a soft delete of a user record. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique user ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "User deleted successfully",
      data: null
    }
  },

  // Categories
  {
    id: "categories-create",
    module: "categories",
    name: "Create Category",
    method: "POST",
    path: "/api/categories",
    description: "Creates a new category. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: {
      name: "Electronics",
      description: "Electronic gadgets and devices"
    },
    responseSchema: {
      success: true,
      message: "Category created successfully",
      data: {
        id: 1,
        name: "Electronics",
        description: "Electronic gadgets and devices",
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z"
      }
    }
  },
  {
    id: "categories-get-all",
    module: "categories",
    name: "Get All Categories",
    method: "GET",
    path: "/api/categories",
    description: "Retrieves a list of all active categories. Public access.",
    headers: [],
    params: [],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Categories retrieved successfully",
      data: [
        {
          id: 1,
          name: "Electronics",
          description: "Electronic gadgets and devices",
          isDeleted: false,
          createdAt: "2026-08-11T13:40:00.000Z",
          updatedAt: "2026-08-11T13:40:00.000Z"
        }
      ]
    }
  },
  {
    id: "categories-get-id",
    module: "categories",
    name: "Get Category by ID",
    method: "GET",
    path: "/api/categories/:id",
    description: "Retrieves details of a category by ID. Public access.",
    headers: [],
    params: [
      { name: "id", type: "number", required: true, description: "The unique category ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Category retrieved successfully",
      data: {
        id: 1,
        name: "Electronics",
        description: "Electronic gadgets and devices",
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z"
      }
    }
  },
  {
    id: "categories-update",
    module: "categories",
    name: "Update Category",
    method: "PATCH",
    path: "/api/categories/:id",
    description: "Modifies dynamic properties of a category. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique category ID" }
    ],
    bodySchema: {
      description: "Updated description for electronics gadgets"
    },
    responseSchema: {
      success: true,
      message: "Category updated successfully",
      data: {
        id: 1,
        name: "Electronics",
        description: "Updated description for electronics gadgets",
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:46:00.000Z"
      }
    }
  },
  {
    id: "categories-delete",
    module: "categories",
    name: "Delete Category",
    method: "DELETE",
    path: "/api/categories/:id",
    description: "Performs soft delete of a category. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique category ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Category deleted successfully",
      data: null
    }
  },

  // Products
  {
    id: "products-create",
    module: "products",
    name: "Create Product",
    method: "POST",
    path: "/api/products",
    description: "Publishes a new product linked to a category. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: {
      name: "Smartphone X",
      description: "High-end mobile device",
      price: 999.99,
      stock: 50,
      categoryId: 1
    },
    responseSchema: {
      success: true,
      message: "Product created successfully",
      data: {
        id: 1,
        name: "Smartphone X",
        description: "High-end mobile device",
        price: 999.99,
        stock: 50,
        status: "ACTIVE",
        isDeleted: false,
        categoryId: 1,
        userId: 1,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z",
        category: {
          id: 1,
          name: "Electronics"
        }
      }
    }
  },
  {
    id: "products-get-all",
    module: "products",
    name: "Get All Products",
    method: "GET",
    path: "/api/products",
    description: "Fetches active products list. Public access.",
    headers: [],
    params: [],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Products retrieved successfully",
      data: [
        {
          id: 1,
          name: "Smartphone X",
          price: 999.99,
          stock: 50,
          categoryId: 1,
          userId: 1,
          category: {
            id: 1,
            name: "Electronics"
          }
        }
      ]
    }
  },
  {
    id: "products-get-id",
    module: "products",
    name: "Get Product by ID",
    method: "GET",
    path: "/api/products/:id",
    description: "Fetches details of an active product. Public access.",
    headers: [],
    params: [
      { name: "id", type: "number", required: true, description: "The unique product ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Product retrieved successfully",
      data: {
        id: 1,
        name: "Smartphone X",
        price: 999.99,
        stock: 50,
        categoryId: 1,
        userId: 1,
        category: {
          id: 1,
          name: "Electronics"
        }
      }
    }
  },
  {
    id: "products-update",
    module: "products",
    name: "Update Product",
    method: "PATCH",
    path: "/api/products/:id",
    description: "Updates price, stock, or descriptions of a product. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique product ID" }
    ],
    bodySchema: {
      price: 899.99,
      stock: 45
    },
    responseSchema: {
      success: true,
      message: "Product updated successfully",
      data: {
        id: 1,
        name: "Smartphone X",
        price: 899.99,
        stock: 45,
        categoryId: 1,
        userId: 1
      }
    }
  },
  {
    id: "products-delete",
    module: "products",
    name: "Delete Product",
    method: "DELETE",
    path: "/api/products/:id",
    description: "Soft deletes a product record. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique product ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Product deleted successfully",
      data: null
    }
  },

  // Orders
  {
    id: "orders-create",
    module: "orders",
    name: "Place Order",
    method: "POST",
    path: "/api/orders",
    description: "Registers a customer order and decrements product stock. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: {
      quantity: 2,
      productId: 1
    },
    responseSchema: {
      success: true,
      message: "Order created successfully",
      data: {
        id: 1,
        status: "PENDING",
        quantity: 2,
        userId: 1,
        productId: 1,
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z",
        product: {
          id: 1,
          name: "Smartphone X",
          price: 999.99,
          stock: 48
        }
      }
    }
  },
  {
    id: "orders-get-all",
    module: "orders",
    name: "Get All Orders",
    method: "GET",
    path: "/api/orders",
    description: "Retrieves complete orders list. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Orders retrieved successfully",
      data: [...]
    }
  },
  {
    id: "orders-get-id",
    module: "orders",
    name: "Get Order by ID",
    method: "GET",
    path: "/api/orders/:id",
    description: "Retrieves details of an order. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique order ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Order retrieved successfully",
      data: {...}
    }
  },
  {
    id: "orders-update",
    module: "orders",
    name: "Update Order Status",
    method: "PATCH",
    path: "/api/orders/:id",
    description: "Modifies the shipping/delivery status of an order. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique order ID" }
    ],
    bodySchema: {
      status: "CONFIRMED"
    },
    responseSchema: {
      success: true,
      message: "Order updated successfully",
      data: {
        id: 1,
        status: "CONFIRMED",
        quantity: 2,
        userId: 1,
        productId: 1
      }
    }
  },
  {
    id: "orders-delete",
    module: "orders",
    name: "Delete Order",
    method: "DELETE",
    path: "/api/orders/:id",
    description: "Soft deletes an order record. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique order ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Order deleted successfully",
      data: null
    }
  },

  // Reviews
  {
    id: "reviews-create",
    module: "reviews",
    name: "Submit Review",
    method: "POST",
    path: "/api/reviews",
    description: "Publishes a product feedback review. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [],
    bodySchema: {
      rating: 5,
      comment: "Excellent device! Highly recommend it.",
      productId: 1
    },
    responseSchema: {
      success: true,
      message: "Review created successfully",
      data: {
        id: 1,
        rating: 5,
        comment: "Excellent device! Highly recommend it.",
        userId: 1,
        productId: 1,
        isDeleted: false,
        createdAt: "2026-08-11T13:40:00.000Z",
        updatedAt: "2026-08-11T13:40:00.000Z",
        user: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com"
        },
        product: {
          id: 1,
          name: "Smartphone X"
        }
      }
    }
  },
  {
    id: "reviews-get-all",
    module: "reviews",
    name: "Get All Reviews",
    method: "GET",
    path: "/api/reviews",
    description: "Retrieves complete review history. Public access.",
    headers: [],
    params: [],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Reviews retrieved successfully",
      data: [...]
    }
  },
  {
    id: "reviews-get-id",
    module: "reviews",
    name: "Get Review by ID",
    method: "GET",
    path: "/api/reviews/:id",
    description: "Fetches review details. Public access.",
    headers: [],
    params: [
      { name: "id", type: "number", required: true, description: "The unique review ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Review retrieved successfully",
      data: {...}
    }
  },
  {
    id: "reviews-update",
    module: "reviews",
    name: "Update Review",
    method: "PATCH",
    path: "/api/reviews/:id",
    description: "Updates rating or comment feedback. Requires Authorization.",
    headers: [
      { name: "Content-Type", value: "application/json", description: "JSON payload format" },
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique review ID" }
    ],
    bodySchema: {
      rating: 4,
      comment: "Updated: Decent device, but battery drains quick."
    },
    responseSchema: {
      success: true,
      message: "Review updated successfully",
      data: {
        id: 1,
        rating: 4,
        comment: "Updated: Decent device, but battery drains quick.",
        userId: 1,
        productId: 1
      }
    }
  },
  {
    id: "reviews-delete",
    module: "reviews",
    name: "Delete Review",
    method: "DELETE",
    path: "/api/reviews/:id",
    description: "Soft deletes a product review. Requires Authorization.",
    headers: [
      { name: "Authorization", value: "Bearer <token>", description: "JWT authorization token" }
    ],
    params: [
      { name: "id", type: "number", required: true, description: "The unique review ID" }
    ],
    bodySchema: null,
    responseSchema: {
      success: true,
      message: "Review deleted successfully",
      data: null
    }
  }
];

// App Navigation & Interactive State State
let activeEndpoint = null;

// DOM Elements
const elServerUrl = document.getElementById("server-url");
const elAuthToken = document.getElementById("auth-token");
const elClearToken = document.getElementById("clear-token");
const elSearchInput = document.getElementById("endpoint-search");
const elWelcomeView = document.getElementById("welcome-view");
const elEndpointView = document.getElementById("endpoint-view");

// Set base URL dynamically
const currentHost = window.location.protocol + "//" + window.location.host;
elServerUrl.value = currentHost;

// Init navigation lists
function initNav() {
  const categories = {
    auth: document.getElementById("nav-auth"),
    users: document.getElementById("nav-users"),
    categories: document.getElementById("nav-categories"),
    products: document.getElementById("nav-products"),
    orders: document.getElementById("nav-orders"),
    reviews: document.getElementById("nav-reviews")
  };

  // Clear existing
  Object.values(categories).forEach(el => el.innerHTML = "");

  // Generate list items
  endpoints.forEach(ep => {
    const li = document.createElement("li");
    li.className = "nav-item";
    li.dataset.id = ep.id;
    li.innerHTML = `
      <span class="nav-method ${ep.method}">${ep.method}</span>
      <span class="nav-name">${ep.name}</span>
    `;
    li.addEventListener("click", () => selectEndpoint(ep));
    if (categories[ep.module]) {
      categories[ep.module].appendChild(li);
    }
  });
}

// Select an endpoint to view in detail
function selectEndpoint(ep) {
  activeEndpoint = ep;

  // Update active item in sidebar
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.dataset.id === ep.id) {
      item.classList.add("active");
    }
  });

  // Switch tabs
  elWelcomeView.classList.remove("active");
  elEndpointView.classList.add("active");

  // Load details
  document.getElementById("view-method").className = `method-badge ${ep.method}`;
  document.getElementById("view-method").textContent = ep.method;
  document.getElementById("view-title").textContent = ep.name;
  document.getElementById("view-desc").textContent = ep.description;
  document.getElementById("view-full-url").textContent = elServerUrl.value + ep.path;

  // Setup headers table
  const tableHeaders = document.getElementById("table-headers");
  const cardHeaders = document.getElementById("card-headers");
  if (ep.headers && ep.headers.length > 0) {
    cardHeaders.style.display = "block";
    tableHeaders.innerHTML = `
      <tr>
        <th>Header</th>
        <th>Value</th>
        <th>Description</th>
      </tr>
      ${ep.headers.map(h => `
        <tr>
          <td><strong>${h.name}</strong></td>
          <td><code>${h.value}</code></td>
          <td>${h.description}</td>
        </tr>
      `).join("")}
    `;
  } else {
    cardHeaders.style.display = "none";
  }

  // Setup path parameters table & playground inputs
  const tableParams = document.getElementById("table-params");
  const cardParams = document.getElementById("card-params");
  const paramsInputSection = document.getElementById("params-input-section");
  const paramsInputsContainer = document.getElementById("params-inputs-container");

  if (ep.params && ep.params.length > 0) {
    cardParams.style.display = "block";
    paramsInputSection.style.display = "block";
    
    tableParams.innerHTML = `
      <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Required</th>
        <th>Description</th>
      </tr>
      ${ep.params.map(p => `
        <tr>
          <td class="param-name">:${p.name}</td>
          <td class="param-type">${p.type}</td>
          <td>${p.required ? '<span class="param-req">required</span>' : 'optional'}</td>
          <td>${p.description}</td>
        </tr>
      `).join("")}
    `;

    paramsInputsContainer.innerHTML = ep.params.map(p => `
      <div class="input-field">
        <label for="param-input-${p.name}">${p.name} (${p.type})</label>
        <input type="text" id="param-input-${p.name}" placeholder="e.g. 1" value="1">
      </div>
    `).join("");
  } else {
    cardParams.style.display = "none";
    paramsInputSection.style.display = "none";
    paramsInputsContainer.innerHTML = "";
  }

  // Setup Request Body Schema
  const codeBodySchema = document.getElementById("code-body-schema");
  const cardBodySchema = document.getElementById("card-body-schema");
  const bodyInputSection = document.getElementById("body-input-section");
  const bodyEditor = document.getElementById("body-editor");
  const bodyEditorStatus = document.getElementById("body-editor-status");

  if (ep.bodySchema) {
    cardBodySchema.style.display = "block";
    bodyInputSection.style.display = "block";
    codeBodySchema.textContent = JSON.stringify(ep.bodySchema, null, 2);
    bodyEditor.value = JSON.stringify(ep.bodySchema, null, 2);
    bodyEditorStatus.textContent = "JSON is Valid";
    bodyEditorStatus.className = "editor-status";
  } else {
    cardBodySchema.style.display = "none";
    bodyInputSection.style.display = "none";
    bodyEditor.value = "";
  }

  // Setup Expected Response Schema
  document.getElementById("code-response-schema").textContent = JSON.stringify(ep.responseSchema, null, 2);

  // Clear Output Console
  document.getElementById("response-status").textContent = "---";
  document.getElementById("response-status").className = "status-badge";
  document.getElementById("response-output").textContent = "// Click 'Send Request' to execute call...";
}

// JSON Editor Live Validation
document.getElementById("body-editor").addEventListener("input", (e) => {
  const status = document.getElementById("body-editor-status");
  if (!e.target.value.trim()) {
    status.textContent = "Empty Body";
    status.className = "editor-status";
    return;
  }
  try {
    JSON.parse(e.target.value);
    status.textContent = "JSON is Valid";
    status.className = "editor-status";
  } catch (err) {
    status.textContent = "JSON is Invalid: " + err.message;
    status.className = "editor-status error";
  }
});

// Search Endpoints Filter
elSearchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".nav-item").forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// Clear token action
elClearToken.addEventListener("click", () => {
  elAuthToken.value = "";
});

// Execute REST API Request Playground Console
document.getElementById("btn-send-request").addEventListener("click", async () => {
  if (!activeEndpoint) return;

  const btn = document.getElementById("btn-send-request");
  const elStatus = document.getElementById("response-status");
  const elOutput = document.getElementById("response-output");

  btn.disabled = true;
  elStatus.textContent = "PENDING...";
  elStatus.className = "status-badge status-pending";
  elOutput.textContent = "// Executing REST Call in playground...";

  // 1. Build URL path replacing any path params
  let targetPath = activeEndpoint.path;
  if (activeEndpoint.params) {
    activeEndpoint.params.forEach(p => {
      const inputVal = document.getElementById(`param-input-${p.name}`).value;
      targetPath = targetPath.replace(`:${p.name}`, encodeURIComponent(inputVal));
    });
  }

  const fullUrl = elServerUrl.value.trim() + targetPath;

  // 2. Prepare headers
  const headers = {
    "Content-Type": "application/json"
  };

  const token = elAuthToken.value.trim();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 3. Prepare payload config
  const config = {
    method: activeEndpoint.method,
    headers
  };

  if (activeEndpoint.bodySchema) {
    try {
      config.body = JSON.stringify(JSON.parse(document.getElementById("body-editor").value));
    } catch (e) {
      elStatus.textContent = "ERROR";
      elStatus.className = "status-badge status-error";
      elOutput.textContent = `// JSON Editor Payload Error:\n${e.message}`;
      btn.disabled = false;
      return;
    }
  }

  // 4. Send fetch call
  try {
    const start = performance.now();
    const res = await fetch(fullUrl, config);
    const end = performance.now();
    const latency = Math.round(end - start);

    elStatus.textContent = `${res.status} ${res.statusText} (${latency}ms)`;
    if (res.ok) {
      elStatus.className = "status-badge status-success";
    } else {
      elStatus.className = "status-badge status-error";
    }

    // Try parsing json output
    const textOutput = await res.text();
    try {
      const jsonOutput = JSON.parse(textOutput);
      elOutput.textContent = JSON.stringify(jsonOutput, null, 2);

      // Special helper: if registration/login response has token, print tips
      if (activeEndpoint.id === "auth-login" && jsonOutput.success && jsonOutput.data && jsonOutput.data.token) {
        elOutput.textContent += `\n\n// 💡 Tip: Copy the token above and paste it in the "Bearer Token" header input at the top of this page to run protected calls!`;
      }
    } catch (e) {
      elOutput.textContent = textOutput;
    }
  } catch (error) {
    elStatus.textContent = "FAIL";
    elStatus.className = "status-badge status-error";
    elOutput.textContent = `// Network Fetch Failed:\n${error.message}`;
  } finally {
    btn.disabled = false;
  }
});

// App Startup
initNav();
