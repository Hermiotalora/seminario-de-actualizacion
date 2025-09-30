export class UserController {
  constructor(userService, usersTable, modal) {
    this.userService = userService;
    this.usersTable = usersTable;
    this.modal = modal;
  }

  async loadUsers() {
    try {
      var users = await this.userService.getAllUsers();
      this.usersTable.renderTable(users);
    } catch (err) {
      this.usersTable.showError(err.message);
    }
  }

  async showUserDetail(userId) {
    try {
      var user = await this.userService.getUserById(userId);

      var detail = document.createElement("wc-user-detail");
      detail.setUser(user);

      this.modal.setContent(detail);
      this.modal.open();
    } catch (err) {
      var errorNode = document.createElement("p");
      errorNode.textContent = "Error cargando detalle: " + err.message;
      this.modal.setContent(errorNode);
      this.modal.open();
    }
  }
}
