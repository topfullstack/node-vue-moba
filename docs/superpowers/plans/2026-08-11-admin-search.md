# Admin Resource Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add safe server-side text search and a shared search control to the authenticated admin resource lists, resolving GitHub issue #63.

**Architecture:** A pure server helper owns the allowlist, validation, regex escaping, and MongoDB filter construction. The existing REST list route applies that filter without changing its array response or 100-item limit. A shared Vue 2 component sends the same `q` parameter from each admin list page.

**Tech Stack:** Node.js, Express, Mongoose, Vue 2, Element UI, Axios, Node `assert`.

## Global Constraints

- Do not upgrade or add dependencies.
- Preserve existing behavior when `q` is absent.
- Search only approved resource-specific fields.
- Treat input literally and reject queries longer than 100 characters.
- Preserve JWT authentication, Category population, and the 100-item limit.

---

### Task 1: Search Policy and Query Builder

**Files:**
- Create: `server/utils/search.js`
- Create: `server/test/search.test.js`
- Modify: `server/package.json`

**Interfaces:**
- Consumes: Mongoose model name and raw `req.query.q`.
- Produces: `buildSearchFilter(modelName, rawQuery)`, `MAX_QUERY_LENGTH`, and `escapeRegExp`.

- [ ] **Step 1: Write the failing test**

Use Node `assert` to test empty input, trimming, Category `name`, Hero `name` plus `title`, escaped regex characters, case-insensitive mode, unknown models, and rejection above 100 characters.

- [ ] **Step 2: Run it to verify failure**

Run `node server/test/search.test.js`; expect failure because `../utils/search` does not exist.

- [ ] **Step 3: Implement the minimal helper**

Use this frozen policy:

```js
const SEARCHABLE_FIELDS = Object.freeze({
  Category: ['name'],
  Item: ['name'],
  Hero: ['name', 'title'],
  Article: ['title'],
  Ad: ['name'],
  AdminUser: ['username']
})
```

Trim input, return `{}` for empty input or an unconfigured model, throw an error with `statusCode = 422` above 100 characters, escape regex metacharacters, and return one case-insensitive literal regex condition per allowed field.

- [ ] **Step 4: Add and run the test script**

Add `"test": "node test/search.test.js"` to `server/package.json`, then run `npm test --prefix server`; expect all assertions to pass.

- [ ] **Step 5: Commit**

```bash
git add server/utils/search.js server/test/search.test.js server/package.json
git commit -m "test: define safe admin search policy"
```

### Task 2: REST List Route Integration

**Files:**
- Modify: `server/routes/admin/index.js`

**Interfaces:**
- Consumes: `buildSearchFilter(req.Model.modelName, req.query.q)`.
- Produces: the existing array response filtered by safe MongoDB conditions.

- [ ] **Step 1: Wire the tested helper into the route**

Import `buildSearchFilter`, construct `filter` in the list handler, and change `req.Model.find()` to `req.Model.find(filter)`. Preserve population and limit behavior.

- [ ] **Step 2: Run tests and commit**

Run `npm test --prefix server`, then commit the route and test as `feat: add safe admin resource search API`.

### Task 3: Shared Admin Search Control

**Files:**
- Create: `admin/src/components/ResourceSearch.vue`
- Modify: all six `admin/src/views/*List.vue` resource list views.

**Interfaces:**
- Consumes: a Vue 2 `value` string.
- Produces: `input` events and a `search` event containing trimmed text.

- [ ] **Step 1: Create the shared component**

Use an Element UI input with `maxlength="100"`, `clearable`, Enter-to-search, a search button, and clear-triggered refresh.

- [ ] **Step 2: Wire all list views**

Register `ResourceSearch`, add `query: ''`, render it above the table, accept a query in `fetch(query = this.query)`, and send `{ params: { q: query || undefined } }` through Axios.

- [ ] **Step 3: Verify and commit**

Run `npm run lint --prefix admin` and `npm run build --prefix admin`. Revert tracked compiled output if the build changes it. Commit source changes as `feat: add search to admin resource lists`.

### Task 4: Documentation and Final Verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- Documents: `GET /admin/api/rest/:resource?q=<text>`, supported fields, literal matching, and the 100-character limit.

- [ ] **Step 1: Document the feature**

Add one concise admin-search section with an example and supported resources.

- [ ] **Step 2: Run final verification**

Run `npm test --prefix server`, `npm run lint --prefix admin`, `npm run build --prefix admin`, `git diff --check`, and `git status --short`.

- [ ] **Step 3: Commit and inspect scope**

Commit README as `docs: document admin resource search`. Inspect `git log --oneline origin/master..HEAD` and `git diff --stat origin/master...HEAD`, confirming no dependency versions, lockfiles, generated bundles, secrets, or unrelated files changed.

- [ ] **Step 4: Stop before external actions**

Do not run `git push`, comment on issue #63, or close it until action-time confirmation. Present exact commits, verification evidence, target branch, and proposed issue response.
