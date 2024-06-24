/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    // User Table
    .createTable('User', (table) => {
      table.string('userId', 255).primary(); 
      table.boolean('hasImage').defaultTo(false);
      table.string('name', 255);
      table.string('email', 255).unique();
      table.string('password', 255);
      table.string('roles', 255).checkIn(['USER', 'INSTITUTION', 'SUPERADMIN']);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    // Category Table
    .createTable('Category', (table) => {
      table.string('categoryId', 255).primary();
      table.string('categoryName', 255);
    })
    // UserCategory Table
    .createTable('UserCategory', (table) => {
      table.string('userCategoryId', 255).primary();
      table
        .string('categoryId', 255)
        .references('categoryId')
        .inTable('Category')
        .onDelete('CASCADE'); 
      table
        .string('userId', 255)
        .references('userId')
        .inTable('User')
        .onDelete('CASCADE');
    })
    // UserReport Table
    .createTable('UserReport', (table) => {
      table.string('reportId', 255).primary();
      table.text('reportContent');
      table.boolean('hasImage').defaultTo(false);
      table
        .string('categoryId', 255)
        .references('categoryId')
        .inTable('Category')
        .onDelete('CASCADE');
      table
        .string('userId', 255)
        .references('userId')
        .inTable('User')
        .onDelete('CASCADE');
      table.string('district', 255);
      table.string('subdistrict', 255);
      table.string('address', 255);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    // ReportResponse Table
    .createTable('ReportResponse', (table) => {
      table.string('responseId', 255).primary();
      table
        .string('reportId', 255)
        .references('reportId')
        .inTable('UserReport')
        .onDelete('CASCADE'); 
      table
        .string('userId', 255)
        .references('userId')
        .inTable('User')
        .onDelete('CASCADE'); 
      table.timestamp('responseDate').defaultTo(knex.fn.now());
    })
    // ReportResult Table
    .createTable('ReportResult', (table) => {
      table.string('resultId', 255).primary(); 
      table
        .string('reportId', 255)
        .references('reportId')
        .inTable('UserReport')
        .onDelete('CASCADE'); 
      table
        .string('userId', 255) 
        .references('userId')
        .inTable('User')
        .onDelete('CASCADE'); 
      table.text('resultContent');
      table.boolean('hasImage').defaultTo(false);
      table.timestamp('resultDate').defaultTo(knex.fn.now());
    })
    // SameReporter Table
    .createTable('SameReporter', (table) => {
      table.string('sameReporterId', 255).primary();
      table
        .string('reportId', 255)
        .references('reportId')
        .inTable('UserReport')
        .onDelete('CASCADE');
      table
        .string('userId', 255)
        .references('userId')
        .inTable('User')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('SameReporter')
    .dropTableIfExists('ReportResult')
    .dropTableIfExists('ReportResponse')
    .dropTableIfExists('UserReport')
    .dropTableIfExists('UserCategory')
    .dropTableIfExists('Category')
    .dropTableIfExists('User'); 
};