/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // ... (deletion of existing data as before) ...

  // Insert data with specific IDs
  await knex('User').insert([
    { userId: 'US06241', hasImage: false,  name: 'Asep', email: 'asep@mail.com', password: 'Asep', roles: 'USER' },
    { userId: 'US06242', hasImage: false, name: 'Alice', email: 'alice@mail.com', password: 'Alice', roles: 'USER' },
    { userId: 'IN06241', hasImage: false, name: 'Institusi', email: 'institusi@mail.com', password: 'institusi', roles: 'INSTITUTION' },
    { userId: 'SU06241', hasImage: false, name: 'Super Admin', email: 'superadmin@mail.com', password: 'superadmin', roles: 'SUPERADMIN' }
  ]);

  await knex('Category').insert([
    { categoryId: 'CA1', categoryName: 'Road Damage' },
    { categoryId: 'CA2', categoryName: 'Public Facility Issues' },
    { categoryId: 'CA3', categoryName: 'Environmental Concern' }
  ]);

  await knex('UserCategory').insert([
    { userCategoryId: 'UC1', categoryId: 'CA1', userId: 'IN06241' } 
  ]);

  await knex('UserReport').insert([
    { reportId: 'UR06241', reportContent: 'Pothole on Main St', hasImage: false, categoryId: 'CA1', userId: 'US06241', district: 'District A', subdistrict: 'Subdistrict 1', address: '123 Main St' }
  ]);

  await knex('ReportResponse').insert([
    { responseId: 'RR06241', reportId: 'UR06241', userId: 'IN06241' }  
  ]);

  await knex('ReportResult').insert([
    { resultId: 'RE1', reportId: 'UR06241', userId: 'IN06241', resultContent: 'Issue resolved - pothole filled.', hasImage: false } 
  ]);

  await knex('SameReporter').insert([
    { sameReporterId: 'SR1', reportId: 'UR06241', userId: 'US06242' } 
  ]);
};
