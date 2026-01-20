#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name('agent-kit')
    .description('CLI to setup AI Agent Rules & Skills for Cursor, Windsurf, and Antigravity')
    .version('1.0.1')
program
    .command('init', { isDefault: true })
    .description('Initialize Agent Kit in the current directory')
    .action(() => runInit());

async function runInit() {
    console.log(chalk.bold.blue('\n🚀 Agent Kit Setup Wizard\n'));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'ide',
            message: 'Which IDE are you using?',
            choices: [
                { name: 'Cursor (Recommended)', value: 'cursor' },
                { name: 'Windsurf (Codeium)', value: 'windsurf' },
                { name: 'Antigravity (Google)', value: 'antigravity' },
            ],
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type of project is this?',
            choices: [
                { name: 'Backend API', value: 'backend' },
                { name: 'Frontend Web', value: 'frontend' },
                { name: 'DevOps / Infrastructure', value: 'devops' },
                { name: 'Fullstack', value: 'fullstack' },
            ],
        },
        {
            type: 'list',
            name: 'stack',
            message: 'Select your primary Tech Stack:',
            when: (answers) => answers.type === 'backend',
            choices: [
                { name: 'NestJS (Node.js)', value: 'nestjs' },
                { name: 'Laravel (PHP)', value: 'laravel' },
                { name: 'Go (Golang)', value: 'go' },
            ],
        },
        {
            type: 'list',
            name: 'stack',
            message: 'Select your primary Tech Stack:',
            when: (answers) => answers.type === 'frontend',
            choices: [
                { name: 'Next.js (React)', value: 'nextjs' },
                { name: 'Vue 3 / Nuxt', value: 'vue' },
            ],
        },
        {
            type: 'confirm',
            name: 'includeRoles',
            message: 'Do you want to include specialized Roles (Architect, Reviewer, Debugger)?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'includeDevOps',
            message: 'Do you want to include DevOps skills (Docker, CI/CD)?',
            default: false,
        },
    ]);

    const spinner = ora('Setting up your Agent Kit...').start();

    try {
        // 1. Determine Source & Dest paths
        // For NPM package: templates are inside the package
        const kitRoot = path.join(__dirname, '../templates');
        const currentDir = process.cwd();

        // 2. Install based on IDE
        if (answers.ide === 'cursor') {
            await setupCursor(kitRoot, currentDir, answers);
        } else if (answers.ide === 'windsurf') {
            await setupWindsurf(kitRoot, currentDir, answers);
        } else if (answers.ide === 'antigravity') {
            await setupAntigravity(kitRoot, currentDir, answers);
        }

        // 3. Generate Config File
        await generateConfig(currentDir, answers);

        spinner.succeed(chalk.green('Setup complete! Agent Kit is ready.'));
        console.log(chalk.yellow('\nNext Steps:'));
        if (answers.ide === 'cursor') {
            console.log('1. Open .cursorrules to see active rules');
            console.log('2. Type / in Chat to use Skills');
        } else if (answers.ide === 'windsurf') {
            console.log('1. Check AGENTS.md in root');
            console.log('2. Use @skill-name in Cascade');
        }

    } catch (error) {
        spinner.fail(chalk.red('Setup failed!'));
        console.error(error);
    }
}

async function setupCursor(kitRoot, dest, answers) {
    const cursorDir = path.join(dest, '.cursor');
    await fs.ensureDir(cursorDir);

    console.log(chalk.dim('  - Setting up .cursor...'));

    // 1. Copy .cursorrules (Entry point)
    const rulesSrc = path.join(kitRoot, 'cursorrules.template');
    if (await fs.pathExists(rulesSrc)) {
        await fs.copy(rulesSrc, path.join(dest, '.cursorrules'));
    }

    const skillsSrc = path.join(kitRoot, 'skills');
    const skillsDest = path.join(cursorDir, 'skills');
    await fs.ensureDir(skillsDest);

    // 2. ALWAYS Copy Project Standards (Core)
    await fs.copy(path.join(skillsSrc, 'project-standards'), path.join(skillsDest, 'project-standards'));

    // 3. Copy Specialized Roles (Optional)
    if (answers.includeRoles) {
        const roles = ['role-implementer', 'role-architect', 'role-reviewer', 'role-debugger'];
        for (const role of roles) {
            await copySkill(skillsSrc, skillsDest, role);
        }
    }

    // 4. Copy Tech Stack (Strictly Selected)
    if (answers.stack) {
        const stackMapping = {
            'nestjs': 'backend-nestjs',
            'laravel': 'backend-laravel',
            'go': 'backend-go',
            'nextjs': 'frontend-nextjs',
            'vue': 'frontend-vue'
        };
        const skillName = stackMapping[answers.stack];
        if (skillName) {
            await copySkill(skillsSrc, skillsDest, skillName);
        }
    }

    // 5. Copy DevOps (Optional)
    if (answers.includeDevOps) {
        await copySkill(skillsSrc, skillsDest, 'devops-docker');
        await copySkill(skillsSrc, skillsDest, 'devops-cicd');
    }
}

async function setupWindsurf(kitRoot, dest, answers) {
    const windsurfDir = path.join(dest, '.windsurf');
    await fs.ensureDir(windsurfDir);

    console.log(chalk.dim('  - Setting up .windsurf...'));

    // 1. Copy AGENTS.md (Entry point)
    const agentsSrc = path.join(kitRoot, 'agents.md.template');
    if (await fs.pathExists(agentsSrc)) {
        await fs.copy(agentsSrc, path.join(dest, 'AGENTS.md'));
    }

    const skillsSrc = path.join(kitRoot, 'skills');
    const skillsDest = path.join(windsurfDir, 'skills');
    await fs.ensureDir(skillsDest);

    // 2. ALWAYS Copy Project Standards
    await fs.copy(path.join(skillsSrc, 'project-standards'), path.join(skillsDest, 'project-standards'));

    // 3. Copy Specialized Roles (Optional)
    if (answers.includeRoles) {
        const roles = ['role-implementer', 'role-architect', 'role-reviewer', 'role-debugger'];
        for (const role of roles) {
            await copySkill(skillsSrc, skillsDest, role);
        }
    }

    // 4. Copy Tech Stack (Strictly Selected)
    if (answers.stack) {
        const stackMapping = {
            'nestjs': 'backend-nestjs',
            'laravel': 'backend-laravel',
            'go': 'backend-go',
            'nextjs': 'frontend-nextjs',
            'vue': 'frontend-vue'
        };
        const skillName = stackMapping[answers.stack];
        if (skillName) {
            await copySkill(skillsSrc, skillsDest, skillName);
        }
    }

    // 5. Copy DevOps (Optional)
    if (answers.includeDevOps) {
        await copySkill(skillsSrc, skillsDest, 'devops-docker');
        await copySkill(skillsSrc, skillsDest, 'devops-cicd');
    }
}

// Helper to copy safely
async function copySkill(srcRoot, destRoot, skillName) {
    const src = path.join(srcRoot, skillName);
    const dest = path.join(destRoot, skillName);
    if (await fs.pathExists(src)) {
        await fs.copy(src, dest);
    }
}

async function setupAntigravity(kitRoot, dest, answers) {
    const agentDir = path.join(dest, '.agent');
    await fs.ensureDir(agentDir);

    // Assuming Antigravity uses simple copy of .agent folder for now
    // In a real CLI, we would filter like above
    const src = path.join(kitRoot, '.agent');
    if (await fs.pathExists(src)) {
        await fs.copy(src, agentDir);
    }
}

async function generateConfig(dest, answers) {
    const configContent = `---
project_type: ${answers.type}
tech_stack: ${answers.stack || 'unknown'}
ide: ${answers.ide}
created_at: ${new Date().toISOString()}
---

# Project Configuration
This file helps the AI Agent understand your project's context.
`;

    let fileName = 'agent-project-config.md';
    if (answers.ide === 'cursor') fileName = 'cursor-project-config.md';
    else if (answers.ide === 'windsurf') fileName = '.windsurf/project-config.md'; // Windsurf prefers config in hidden folder

    await fs.outputFile(path.join(dest, fileName), configContent);
}

program.parse(process.argv);
