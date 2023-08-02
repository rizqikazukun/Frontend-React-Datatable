export const getAllProduct = async () => {
  const response = await fetch("http://localhost:3000/api/getproduct");
  const result = await response.json();
  return result
}

export const deleteProduct = async (id) => {
  const response = await fetch(`http://localhost:3000/api/deleteproduct/${id}`, {
    method: "DELETE"
  });
  const result = await response.json();
  return result
}

export const getDetailProduct = async (id) => {
  const response = await fetch(`http://localhost:3000/api/getproduct/${id}`, {
    method: "GET"
  });
  const result = await response.json();
  return result
}

export const addProduct = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/api/addproduct", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

export const updateProduct = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/api/updateproduct", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}