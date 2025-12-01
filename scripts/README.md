# Notion Sync Script

Export the Nordic Circular Summit 2025 intelligence data to a Notion workspace.

## What Gets Exported

The script creates a complete **Summit Intelligence Hub** in Notion with these databases:

| Database | Records | Description |
|----------|---------|-------------|
| **Strategic Opportunities** | 6 | Priority opportunities for NCH |
| **Quick Wins** | 4 | Immediate actions with deadlines |
| **Key Contacts** | 6 | Priority contacts for follow-up |
| **Success Metrics** | 12 | Short/medium/long-term goals |
| **Project Pipeline** | 11 | Projects from the summit |
| **Funding Sources** | 10 | Relevant funding opportunities |
| **Statistics Bank** | 75+ | All statistics from sessions |

## Setup Instructions

### 1. Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Name it something like "NCS 2025 Sync"
4. Select your workspace
5. Click **Submit**
6. Copy the **Internal Integration Token** (starts with `secret_`)

### 2. Prepare a Parent Page

1. In Notion, create or choose a page where you want the hub
2. Click **Share** in the top right
3. Click **Invite**
4. Search for your integration name and add it
5. Copy the page ID from the URL:
   ```
   https://www.notion.so/Your-Page-Name-abc123def456...
                                        ↑ This is the page ID
   ```

### 3. Set Environment Variables

```bash
export NOTION_TOKEN="secret_your_token_here"
export NOTION_PARENT_PAGE_ID="your_page_id_here"
```

Or copy `.env.notion.example` to `.env.notion` and fill in the values:
```bash
cp .env.notion.example .env.notion
# Edit .env.notion with your values
source .env.notion
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Sync

```bash
npm run notion:sync
```

Or directly:
```bash
npx ts-node scripts/notion-sync.ts
```

## What Happens

1. **Creates a hub page** called "NCS 2025 Summit Intelligence Hub" under your specified parent page
2. **Creates 7 databases** with proper schemas (properties, select options, etc.)
3. **Populates all data** from the JSON files in `public/summit-intelligence/`
4. **Outputs a link** to your new Notion hub

## Important Notes

### Isolation
- All databases are created **inside** the hub page
- Nothing outside that page is touched
- Delete the hub page to remove everything

### Rate Limiting
- The script includes delays to respect Notion's API limits
- Full sync takes ~2-3 minutes

### Re-running
- Running the script again creates a **new** hub (doesn't update existing)
- Delete the old hub first if you want to refresh

## Troubleshooting

### "unauthorized" error
- Make sure your integration token is correct
- Make sure you shared the parent page with your integration

### "object not found" error
- The page ID might be wrong
- Make sure the page is shared with your integration

### Rate limit errors
- Wait a few minutes and try again
- The script includes delays but Notion's limits can vary

## Customization

To add more databases or modify schemas, edit `scripts/notion-sync.ts`:

- `create*Database()` functions define database schemas
- `populate*()` functions load and insert data
- Add new databases to the `main()` function

## Data Sources

The script reads from these JSON files:
- `public/summit-intelligence/analysis/nch-opportunities.json`
- `public/summit-intelligence/opportunities/projects.json`
- `public/summit-intelligence/opportunities/funding.json`
- `public/summit-intelligence/insights/statistics.json`
