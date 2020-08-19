import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.string("avatar").notNullable();
    table.string("whatsapp");
    table.string("bio");
    table.integer("jwtVersion").defaultTo(0).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
