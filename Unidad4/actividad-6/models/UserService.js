export class UserService {
  async getAllUsers() {
    var response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }
    return await response.json();
  }

  async getUserById(id) {
    var response = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    if (!response.ok) {
      throw new Error("Error al obtener usuario " + id);
    }
    return await response.json();
  }
}
