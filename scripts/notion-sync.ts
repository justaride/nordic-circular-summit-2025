/**
 * Nordic Circular Summit 2025 - Notion Sync Script
 *
 * This script exports all summit data to a Notion workspace.
 * It creates isolated databases under a single parent page.
 *
 * Usage:
 *   1. Create a Notion integration at https://www.notion.so/my-integrations
 *   2. Share a parent page with your integration
 *   3. Set environment variables (see .env.notion.example)
 *   4. Run: npx ts-node scripts/notion-sync.ts
 */

import { Client } from '@notionhq/client';
import * as fs from 'fs';
import * as path from 'path';

// Types
interface NotionConfig {
  token: string;
  parentPageId: string;
}

interface DatabaseIds {
  projects?: string;
  opportunities?: string;
  funding?: string;
  contacts?: string;
  quickWins?: string;
  successMetrics?: string;
  sessions?: string;
  speakers?: string;
  organizations?: string;
  socialPosts?: string;
  statistics?: string;
}

// Load environment variables
const config: NotionConfig = {
  token: process.env.NOTION_TOKEN || '',
  parentPageId: process.env.NOTION_PARENT_PAGE_ID || ''
};

// Initialize Notion client
const notion = new Client({ auth: config.token });

// Database IDs storage
const dbIds: DatabaseIds = {};

// ============================================
// HELPER FUNCTIONS
// ============================================

function loadJson(relativePath: string): any {
  const fullPath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(fullPath)) {
    return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  }
  console.warn(`File not found: ${fullPath}`);
  return null;
}

async function createDivider(parentId: string, title: string): Promise<void> {
  await notion.blocks.children.append({
    block_id: parentId,
    children: [
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: title } }]
        }
      },
      {
        object: 'block',
        type: 'divider',
        divider: {}
      }
    ]
  });
}

// ============================================
// DATABASE CREATION FUNCTIONS
// ============================================

async function createProjectsDatabase(parentId: string): Promise<string> {
  console.log('Creating Projects database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '🚀' },
    title: [{ type: 'text', text: { content: 'Project Pipeline' } }],
    properties: {
      'Name': { title: {} },
      'Status': {
        select: {
          options: [
            { name: 'proposed', color: 'gray' },
            { name: 'launched', color: 'blue' },
            { name: 'active', color: 'green' }
          ]
        }
      },
      'Sector': {
        select: {
          options: [
            { name: 'textiles', color: 'purple' },
            { name: 'construction', color: 'orange' },
            { name: 'cross_sectoral', color: 'blue' },
            { name: 'seafood', color: 'default' }
          ]
        }
      },
      'Type': {
        select: {
          options: [
            { name: 'network', color: 'blue' },
            { name: 'project', color: 'green' },
            { name: 'tool', color: 'yellow' },
            { name: 'institution', color: 'red' },
            { name: 'research', color: 'purple' }
          ]
        }
      },
      'Lead Organization': { rich_text: {} },
      'Countries': { rich_text: {} },
      'NCH Role': { rich_text: {} },
      'NCH Opportunity': { rich_text: {} },
      'Priority': {
        select: {
          options: [
            { name: 'high', color: 'red' },
            { name: 'medium', color: 'yellow' },
            { name: 'low', color: 'gray' }
          ]
        }
      },
      'Funding Status': {
        select: {
          options: [
            { name: 'seeking', color: 'yellow' },
            { name: 'funded', color: 'green' },
            { name: 'various', color: 'blue' }
          ]
        }
      },
      'Timeline': { rich_text: {} },
      'Description': { rich_text: {} }
    }
  });

  return response.id;
}

async function createOpportunitiesDatabase(parentId: string): Promise<string> {
  console.log('Creating Opportunities database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '🎯' },
    title: [{ type: 'text', text: { content: 'Strategic Opportunities' } }],
    properties: {
      'Title': { title: {} },
      'Description': { rich_text: {} },
      'NCH Role': { rich_text: {} },
      'Partners': { multi_select: { options: [] } },
      'Timeline': { rich_text: {} },
      'Priority': {
        select: {
          options: [
            { name: 'high', color: 'red' },
            { name: 'medium', color: 'yellow' }
          ]
        }
      },
      'Impact': { rich_text: {} },
      'Funding Strategy': { rich_text: {} },
      'Next Steps': { rich_text: {} }
    }
  });

  return response.id;
}

async function createFundingDatabase(parentId: string): Promise<string> {
  console.log('Creating Funding Sources database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '💰' },
    title: [{ type: 'text', text: { content: 'Funding Sources' } }],
    properties: {
      'Name': { title: {} },
      'Type': {
        select: {
          options: [
            { name: 'public_agency', color: 'blue' },
            { name: 'intergovernmental', color: 'purple' },
            { name: 'innovation_fund', color: 'green' },
            { name: 'development_bank', color: 'orange' },
            { name: 'eu_programme', color: 'yellow' },
            { name: 'national', color: 'gray' },
            { name: 'private', color: 'pink' }
          ]
        }
      },
      'Geography': { rich_text: {} },
      'Focus Areas': { multi_select: { options: [] } },
      'Relevance': {
        select: {
          options: [
            { name: 'high', color: 'green' },
            { name: 'medium', color: 'yellow' }
          ]
        }
      },
      'Application Tips': { rich_text: {} },
      'Website': { url: {} },
      'Notes': { rich_text: {} }
    }
  });

  return response.id;
}

async function createContactsDatabase(parentId: string): Promise<string> {
  console.log('Creating Contacts database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '👤' },
    title: [{ type: 'text', text: { content: 'Key Contacts' } }],
    properties: {
      'Name': { title: {} },
      'Organization': { rich_text: {} },
      'Opportunity': { rich_text: {} },
      'Priority': {
        select: {
          options: [
            { name: 'high', color: 'red' },
            { name: 'medium', color: 'yellow' }
          ]
        }
      },
      'Email': { email: {} },
      'Follow-up Date': { date: {} },
      'Status': {
        select: {
          options: [
            { name: 'to contact', color: 'gray' },
            { name: 'contacted', color: 'blue' },
            { name: 'in discussion', color: 'yellow' },
            { name: 'confirmed', color: 'green' }
          ]
        }
      },
      'Notes': { rich_text: {} }
    }
  });

  return response.id;
}

async function createQuickWinsDatabase(parentId: string): Promise<string> {
  console.log('Creating Quick Wins database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '✅' },
    title: [{ type: 'text', text: { content: 'Quick Wins' } }],
    properties: {
      'Action': { title: {} },
      'Deadline': { date: {} },
      'Effort': {
        select: {
          options: [
            { name: 'low', color: 'green' },
            { name: 'medium', color: 'yellow' },
            { name: 'high', color: 'red' }
          ]
        }
      },
      'Impact': {
        select: {
          options: [
            { name: 'high', color: 'green' },
            { name: 'medium', color: 'yellow' },
            { name: 'low', color: 'gray' }
          ]
        }
      },
      'Completed': { checkbox: {} },
      'Notes': { rich_text: {} }
    }
  });

  return response.id;
}

async function createSuccessMetricsDatabase(parentId: string): Promise<string> {
  console.log('Creating Success Metrics database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '📈' },
    title: [{ type: 'text', text: { content: 'Success Metrics' } }],
    properties: {
      'Metric': { title: {} },
      'Timeframe': {
        select: {
          options: [
            { name: '6 months', color: 'green' },
            { name: '1 year', color: 'yellow' },
            { name: '3 years', color: 'blue' }
          ]
        }
      },
      'Status': {
        select: {
          options: [
            { name: 'not started', color: 'gray' },
            { name: 'in progress', color: 'yellow' },
            { name: 'achieved', color: 'green' }
          ]
        }
      },
      'Notes': { rich_text: {} }
    }
  });

  return response.id;
}

async function createSessionsDatabase(parentId: string): Promise<string> {
  console.log('Creating Sessions database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '🎤' },
    title: [{ type: 'text', text: { content: 'Sessions' } }],
    properties: {
      'Title': { title: {} },
      'Day': {
        select: {
          options: [
            { name: 'Day 1', color: 'blue' },
            { name: 'Day 2', color: 'green' }
          ]
        }
      },
      'Type': {
        select: {
          options: [
            { name: 'plenary', color: 'purple' },
            { name: 'panel', color: 'blue' },
            { name: 'workshop', color: 'green' },
            { name: 'keynote', color: 'red' },
            { name: 'digital_partner', color: 'orange' }
          ]
        }
      },
      'Time': { rich_text: {} },
      'Duration': { rich_text: {} },
      'Description': { rich_text: {} },
      'Key Themes': { multi_select: { options: [] } },
      'Has Transcript': { checkbox: {} },
      'Has Article': { checkbox: {} }
    }
  });

  return response.id;
}

async function createSpeakersDatabase(parentId: string): Promise<string> {
  console.log('Creating Speakers database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '🎙️' },
    title: [{ type: 'text', text: { content: 'Speakers' } }],
    properties: {
      'Name': { title: {} },
      'Title': { rich_text: {} },
      'Organization': { rich_text: {} },
      'Country': {
        select: {
          options: [
            { name: 'Denmark', color: 'red' },
            { name: 'Norway', color: 'blue' },
            { name: 'Sweden', color: 'yellow' },
            { name: 'Finland', color: 'default' },
            { name: 'Iceland', color: 'blue' },
            { name: 'Greenland', color: 'green' },
            { name: 'Estonia', color: 'blue' },
            { name: 'Latvia', color: 'red' },
            { name: 'Lithuania', color: 'yellow' },
            { name: 'UK', color: 'purple' },
            { name: 'Netherlands', color: 'orange' }
          ]
        }
      },
      'Sector': {
        select: {
          options: [
            { name: 'government', color: 'blue' },
            { name: 'industry', color: 'green' },
            { name: 'academia', color: 'purple' },
            { name: 'ngo', color: 'yellow' },
            { name: 'finance', color: 'orange' }
          ]
        }
      },
      'Bio': { rich_text: {} },
      'LinkedIn': { url: {} },
      'Email': { email: {} }
    }
  });

  return response.id;
}

async function createOrganizationsDatabase(parentId: string): Promise<string> {
  console.log('Creating Organizations database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '🏢' },
    title: [{ type: 'text', text: { content: 'Organizations' } }],
    properties: {
      'Name': { title: {} },
      'Type': {
        select: {
          options: [
            { name: 'government', color: 'blue' },
            { name: 'company', color: 'green' },
            { name: 'ngo', color: 'yellow' },
            { name: 'academia', color: 'purple' },
            { name: 'network', color: 'orange' },
            { name: 'finance', color: 'pink' }
          ]
        }
      },
      'Country': { rich_text: {} },
      'Sector': { multi_select: { options: [] } },
      'Description': { rich_text: {} },
      'Website': { url: {} },
      'Key Contact': { rich_text: {} }
    }
  });

  return response.id;
}

async function createSocialPostsDatabase(parentId: string): Promise<string> {
  console.log('Creating Social Media Posts database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '📱' },
    title: [{ type: 'text', text: { content: 'Social Media Posts' } }],
    properties: {
      'Title': { title: {} },
      'Platform': {
        select: {
          options: [
            { name: 'LinkedIn', color: 'blue' },
            { name: 'Twitter/X', color: 'default' },
            { name: 'Instagram', color: 'pink' },
            { name: 'Facebook', color: 'blue' }
          ]
        }
      },
      'Session': { rich_text: {} },
      'Content': { rich_text: {} },
      'Hashtags': { rich_text: {} },
      'Scheduled Date': { date: {} },
      'Status': {
        select: {
          options: [
            { name: 'draft', color: 'gray' },
            { name: 'ready', color: 'yellow' },
            { name: 'published', color: 'green' }
          ]
        }
      }
    }
  });

  return response.id;
}

async function createStatisticsDatabase(parentId: string): Promise<string> {
  console.log('Creating Statistics database...');

  const response = await notion.databases.create({
    parent: { page_id: parentId },
    icon: { type: 'emoji', emoji: '🔢' },
    title: [{ type: 'text', text: { content: 'Statistics Bank' } }],
    properties: {
      'Statistic': { title: {} },
      'Value': { rich_text: {} },
      'Category': {
        select: {
          options: [
            { name: 'global_context', color: 'blue' },
            { name: 'seafood_industry', color: 'default' },
            { name: 'construction', color: 'orange' },
            { name: 'textiles', color: 'purple' },
            { name: 'economic', color: 'green' },
            { name: 'geographic', color: 'yellow' },
            { name: 'summit_metrics', color: 'pink' }
          ]
        }
      },
      'Source': { rich_text: {} },
      'Session': { rich_text: {} }
    }
  });

  return response.id;
}

// ============================================
// DATA POPULATION FUNCTIONS
// ============================================

async function populateProjects(databaseId: string): Promise<void> {
  console.log('Populating Projects...');
  const data = loadJson('public/summit-intelligence/opportunities/projects.json');
  if (!data?.projects) return;

  for (const project of data.projects) {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Name': { title: [{ text: { content: project.name } }] },
        'Status': project.status ? { select: { name: project.status } } : undefined,
        'Sector': project.sector ? { select: { name: project.sector } } : undefined,
        'Type': project.type ? { select: { name: project.type } } : undefined,
        'Lead Organization': { rich_text: [{ text: { content: project.lead_organization || '' } }] },
        'Countries': { rich_text: [{ text: { content: Array.isArray(project.countries) ? project.countries.join(', ') : (project.countries || '') } }] },
        'NCH Role': { rich_text: [{ text: { content: project.nch_role || '' } }] },
        'NCH Opportunity': { rich_text: [{ text: { content: project.nch_opportunity || '' } }] },
        'Priority': project.priority ? { select: { name: project.priority } } : undefined,
        'Funding Status': project.funding_status ? { select: { name: project.funding_status } } : undefined,
        'Timeline': { rich_text: [{ text: { content: project.timeline || '' } }] },
        'Description': { rich_text: [{ text: { content: project.description || '' } }] }
      }
    });
    await sleep(350); // Rate limiting
  }
}

async function populateOpportunities(databaseId: string): Promise<void> {
  console.log('Populating Opportunities...');
  const data = loadJson('public/summit-intelligence/analysis/nch-opportunities.json');
  if (!data?.priority_opportunities) return;

  for (const opp of data.priority_opportunities) {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Title': { title: [{ text: { content: opp.title } }] },
        'Description': { rich_text: [{ text: { content: opp.description || '' } }] },
        'NCH Role': { rich_text: [{ text: { content: opp.nch_role || '' } }] },
        'Timeline': { rich_text: [{ text: { content: opp.timeline || '' } }] },
        'Priority': opp.priority ? { select: { name: opp.priority } } : undefined,
        'Impact': { rich_text: [{ text: { content: opp.impact || '' } }] },
        'Funding Strategy': { rich_text: [{ text: { content: opp.funding_strategy || '' } }] },
        'Next Steps': { rich_text: [{ text: { content: opp.next_steps?.join('\n• ') || '' } }] }
      }
    });
    await sleep(350);
  }
}

async function populateFunding(databaseId: string): Promise<void> {
  console.log('Populating Funding Sources...');
  const data = loadJson('public/summit-intelligence/opportunities/funding.json');
  if (!data?.funding_sources) return;

  for (const source of data.funding_sources) {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Name': { title: [{ text: { content: source.name } }] },
        'Type': source.type ? { select: { name: source.type } } : undefined,
        'Geography': { rich_text: [{ text: { content: source.geography || '' } }] },
        'Relevance': source.relevance ? { select: { name: source.relevance.toLowerCase() } } : undefined,
        'Application Tips': { rich_text: [{ text: { content: source.application_tips || '' } }] },
        'Website': source.website ? { url: source.website } : undefined,
        'Notes': { rich_text: [{ text: { content: source.notes || '' } }] }
      }
    });
    await sleep(350);
  }
}

async function populateContacts(databaseId: string): Promise<void> {
  console.log('Populating Contacts...');
  const data = loadJson('public/summit-intelligence/analysis/nch-opportunities.json');
  if (!data?.key_contacts_for_follow_up) return;

  for (const contact of data.key_contacts_for_follow_up) {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Name': { title: [{ text: { content: contact.name } }] },
        'Organization': { rich_text: [{ text: { content: contact.organization || '' } }] },
        'Opportunity': { rich_text: [{ text: { content: contact.opportunity || '' } }] },
        'Priority': contact.priority ? { select: { name: contact.priority } } : undefined,
        'Status': { select: { name: 'to contact' } }
      }
    });
    await sleep(350);
  }
}

async function populateQuickWins(databaseId: string): Promise<void> {
  console.log('Populating Quick Wins...');
  const data = loadJson('public/summit-intelligence/analysis/nch-opportunities.json');
  if (!data?.quick_wins) return;

  for (const qw of data.quick_wins) {
    // Parse deadline string to date
    let deadlineDate = null;
    if (qw.deadline) {
      const match = qw.deadline.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d+)?,?\s*(\d{4})/i);
      if (match) {
        const months: Record<string, string> = {
          'january': '01', 'february': '02', 'march': '03', 'april': '04',
          'may': '05', 'june': '06', 'july': '07', 'august': '08',
          'september': '09', 'october': '10', 'november': '11', 'december': '12'
        };
        const month = months[match[1].toLowerCase()];
        const day = match[2] || '15';
        const year = match[3];
        deadlineDate = `${year}-${month}-${day.padStart(2, '0')}`;
      }
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Action': { title: [{ text: { content: qw.action } }] },
        'Deadline': deadlineDate ? { date: { start: deadlineDate } } : undefined,
        'Effort': qw.effort ? { select: { name: qw.effort.toLowerCase() } } : undefined,
        'Impact': qw.impact ? { select: { name: qw.impact.toLowerCase() } } : undefined,
        'Completed': { checkbox: false }
      }
    });
    await sleep(350);
  }
}

async function populateSuccessMetrics(databaseId: string): Promise<void> {
  console.log('Populating Success Metrics...');
  const data = loadJson('public/summit-intelligence/analysis/nch-opportunities.json');
  if (!data?.success_metrics) return;

  const timeframes = [
    { key: 'short_term_6mo', label: '6 months' },
    { key: 'medium_term_1yr', label: '1 year' },
    { key: 'long_term_3yr', label: '3 years' }
  ];

  for (const tf of timeframes) {
    const metrics = data.success_metrics[tf.key];
    if (!metrics) continue;

    for (const metric of metrics) {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          'Metric': { title: [{ text: { content: metric } }] },
          'Timeframe': { select: { name: tf.label } },
          'Status': { select: { name: 'not started' } }
        }
      });
      await sleep(350);
    }
  }
}

async function populateStatistics(databaseId: string): Promise<void> {
  console.log('Populating Statistics...');
  const data = loadJson('public/summit-intelligence/insights/statistics.json');
  if (!data?.categories) return;

  for (const [category, stats] of Object.entries(data.categories)) {
    if (!Array.isArray(stats)) continue;

    for (const stat of stats as any[]) {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          'Statistic': { title: [{ text: { content: stat.stat || '' } }] },
          'Value': { rich_text: [{ text: { content: String(stat.value || '') } }] },
          'Category': { select: { name: category } },
          'Source': { rich_text: [{ text: { content: stat.source || '' } }] },
          'Session': { rich_text: [{ text: { content: stat.session || '' } }] }
        }
      });
      await sleep(350);
    }
  }
}

// ============================================
// MAIN EXECUTION
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n===========================================');
  console.log('  Nordic Circular Summit 2025 - Notion Sync');
  console.log('===========================================\n');

  // Validate configuration
  if (!config.token) {
    console.error('❌ Error: NOTION_TOKEN environment variable is not set');
    console.log('\nTo set up:');
    console.log('1. Create an integration at https://www.notion.so/my-integrations');
    console.log('2. Copy the Internal Integration Token');
    console.log('3. Run: export NOTION_TOKEN="your-token-here"');
    process.exit(1);
  }

  if (!config.parentPageId) {
    console.error('❌ Error: NOTION_PARENT_PAGE_ID environment variable is not set');
    console.log('\nTo set up:');
    console.log('1. Create or choose a page in Notion where you want the hub');
    console.log('2. Share that page with your integration');
    console.log('3. Copy the page ID from the URL (the 32-character string after the page name)');
    console.log('4. Run: export NOTION_PARENT_PAGE_ID="your-page-id-here"');
    process.exit(1);
  }

  try {
    // Test connection
    console.log('🔗 Testing Notion connection...');
    await notion.users.me();
    console.log('✅ Connected to Notion\n');

    // Create main hub page
    console.log('📁 Creating Summit Intelligence Hub...\n');

    const hubPage = await notion.pages.create({
      parent: { page_id: config.parentPageId },
      icon: { type: 'emoji', emoji: '🌐' },
      properties: {
        title: [{ type: 'text', text: { content: 'NCS 2025 Summit Intelligence Hub' } }]
      }
    });

    const hubPageId = hubPage.id;
    console.log(`✅ Hub page created: ${hubPageId}\n`);

    // Add introduction
    await notion.blocks.children.append({
      block_id: hubPageId,
      children: [
        {
          object: 'block',
          type: 'callout',
          callout: {
            icon: { type: 'emoji', emoji: '🌐' },
            rich_text: [{
              type: 'text',
              text: { content: 'Nordic Circular Summit 2025 - Complete summit intelligence exported from the web application. All databases are interconnected and ready for collaboration.' }
            }]
          }
        }
      ]
    });

    // Create databases with section dividers
    await createDivider(hubPageId, '🎯 Strategic Intelligence');
    dbIds.opportunities = await createOpportunitiesDatabase(hubPageId);
    dbIds.quickWins = await createQuickWinsDatabase(hubPageId);
    dbIds.contacts = await createContactsDatabase(hubPageId);
    dbIds.successMetrics = await createSuccessMetricsDatabase(hubPageId);

    await createDivider(hubPageId, '🚀 Projects & Funding');
    dbIds.projects = await createProjectsDatabase(hubPageId);
    dbIds.funding = await createFundingDatabase(hubPageId);

    await createDivider(hubPageId, '📊 Data & Statistics');
    dbIds.statistics = await createStatisticsDatabase(hubPageId);

    console.log('\n✅ All databases created!\n');
    console.log('Database IDs:');
    console.log(JSON.stringify(dbIds, null, 2));

    // Populate databases
    console.log('\n📥 Populating databases with summit data...\n');

    await populateOpportunities(dbIds.opportunities!);
    await populateQuickWins(dbIds.quickWins!);
    await populateContacts(dbIds.contacts!);
    await populateSuccessMetrics(dbIds.successMetrics!);
    await populateProjects(dbIds.projects!);
    await populateFunding(dbIds.funding!);
    await populateStatistics(dbIds.statistics!);

    console.log('\n===========================================');
    console.log('  ✅ Sync Complete!');
    console.log('===========================================');
    console.log(`\nYour Summit Intelligence Hub is ready at:`);
    console.log(`https://notion.so/${hubPageId.replace(/-/g, '')}`);
    console.log('\nDatabases created:');
    console.log('  • Strategic Opportunities');
    console.log('  • Quick Wins');
    console.log('  • Key Contacts');
    console.log('  • Success Metrics');
    console.log('  • Project Pipeline');
    console.log('  • Funding Sources');
    console.log('  • Statistics Bank');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 'unauthorized') {
      console.log('\nMake sure your integration token is correct and the page is shared with your integration.');
    }
    process.exit(1);
  }
}

main();
