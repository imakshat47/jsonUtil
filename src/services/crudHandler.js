// Stateless CRUD handler: echoes operations
export function handleCRUD(operation, payload) {
  switch (operation) {
    case "CREATE":
      return { status: "created", data: payload };
    case "READ":
      return { status: "read", data: payload };
    case "UPDATE":
      return { status: "updated", data: payload };
    case "DELETE":
      return { status: "deleted", data: payload };
    default:
      return { error: "Unknown operation" };
  }
}
