import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

async function main() {
  console.log('Running D1 migrations...');

  try {
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    if (migrationFiles.length === 0) {
      console.log('No migration files found.');
      return;
    }

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      console.log(`Applying migration: ${file}...`);

      try {
        execSync(`wrangler d1 execute eboni-dating --file=${filePath}`, {
          stdio: 'inherit',
        });
        console.log(`Successfully applied migration: ${file}`);
      } catch (error) {
        console.error(`Failed to apply migration: ${file}`);
        console.error('Error details:', error);
        // Stop execution if a migration fails
        process.exit(1);
      }
    }

    console.log('All D1 migrations applied successfully!');
  } catch (error) {
    console.error('Failed to run D1 migrations:', error);
    process.exit(1);
  }
}

main();
