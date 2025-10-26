#!/usr/bin/env node

/**
 * IndieVerse Setup Verification Script
 * Run this to verify your installation is complete
 */

const fs = require('fs');
const path = require('path');

console.log('\n🌐 IndieVerse - Setup Verification\n');
console.log('='.repeat(50));

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// Check if essential files exist
const essentialFiles = [
  'package.json',
  'next.config.mjs',
  'tailwind.config.ts',
  'tsconfig.json',
  'app/page.tsx',
  'app/layout.tsx',
  'app/globals.css',
  'components/ui/button.tsx',
  'components/navigation/navbar.tsx',
  'lib/utils.ts'
];

console.log('\n📁 Checking Essential Files...\n');

essentialFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  if (exists) {
    console.log(`✅ ${file}`);
    checks.passed++;
  } else {
    console.log(`❌ ${file} - MISSING!`);
    checks.failed++;
  }
});

// Check if node_modules exists
console.log('\n📦 Checking Dependencies...\n');

if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ node_modules folder exists');
  checks.passed++;
} else {
  console.log('⚠️  node_modules not found - Run: npm install');
  checks.warnings++;
}

// Check package.json dependencies
try {
  const packageJson = require('./package.json');
  const requiredDeps = ['next', 'react', 'react-dom', 'tailwindcss', 'typescript'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep} configured`);
      checks.passed++;
    } else {
      console.log(`❌ ${dep} missing from package.json`);
      checks.failed++;
    }
  });
} catch (error) {
  console.log('❌ Error reading package.json');
  checks.failed++;
}

// Check directory structure
console.log('\n📂 Checking Directory Structure...\n');

const directories = [
  'app',
  'app/seller',
  'app/products',
  'components',
  'components/ui',
  'components/navigation',
  'lib'
];

directories.forEach(dir => {
  const exists = fs.existsSync(path.join(__dirname, dir));
  if (exists) {
    console.log(`✅ ${dir}/`);
    checks.passed++;
  } else {
    console.log(`❌ ${dir}/ - MISSING!`);
    checks.failed++;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 Verification Summary:\n');
console.log(`✅ Passed:   ${checks.passed}`);
console.log(`❌ Failed:   ${checks.failed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 Perfect! Your IndieVerse setup is complete!\n');
  console.log('Next steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Open: http://localhost:3000');
  console.log('  3. Explore the platform!\n');
} else if (checks.failed === 0) {
  console.log('\n✅ Setup is mostly complete!\n');
  console.log('Action required:');
  console.log('  - Run: npm install\n');
} else {
  console.log('\n⚠️  Setup incomplete. Please check the errors above.\n');
}

console.log('='.repeat(50) + '\n');
