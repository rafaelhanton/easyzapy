import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Attempt to remove the constraint only if it exists
    try {
      await queryInterface.removeConstraint("Tickets", "contactid_companyid_unique");
    } catch (error) {
      console.warn("Constraint 'contactid_companyid_unique' does not exist, skipping removal.");
    }

    // Add the new unique constraint
    await queryInterface.addConstraint("Tickets", ["contactId", "companyId", "whatsappId"], {
      type: "unique",
      name: "contactid_companyid_unique",
    });
  },

  down: async (queryInterface: QueryInterface) => {
    // Attempt to remove the constraint during rollback
    try {
      await queryInterface.removeConstraint("Tickets", "contactid_companyid_unique");
    } catch (error) {
      console.warn("Constraint 'contactid_companyid_unique' does not exist, skipping removal.");
    }
  },
};
