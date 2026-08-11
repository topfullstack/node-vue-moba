# Admin Resource Search Design

## Goal

Resolve GitHub issue #63 by adding useful server-side search to the authenticated admin resource lists without upgrading dependencies or changing existing response shapes.

## Scope

- Add an optional `q` query parameter to `GET /admin/api/rest/:resource`.
- Search only explicit, resource-specific text fields.
- Add a small reusable search control to all six admin list views.
- Document the query parameter and add dependency-free server tests.

Pagination, sorting, advanced filters, dependency upgrades, and public web search are out of scope.

## API Design

Requests without `q` retain the existing behavior and return up to 100 documents as an array.

Example:

```text
GET /admin/api/rest/heroes?q=亚瑟
```

Searchable fields:

| Model | Fields |
| --- | --- |
| Category | `name` |
| Item | `name` |
| Hero | `name`, `title` |
| Article | `title` |
| Ad | `name` |
| AdminUser | `username` |

Search is case-insensitive and treats user input as literal text. Regex metacharacters are escaped. Queries longer than 100 characters are rejected with HTTP 422. Unknown or unconfigured fields cannot be selected by clients.

## Server Components

`server/utils/search.js` owns the searchable-field policy, regex escaping, validation, and MongoDB filter construction. The admin resource route consumes the returned filter before applying existing population and limit behavior. Keeping this policy outside the route makes it independently testable and gives the rule one authoritative owner.

## Admin UI

`admin/src/components/ResourceSearch.vue` provides a compact Element UI input with search and clear behavior. It emits a `search` event with trimmed text. Each list page stores its current query, passes it as the API `q` parameter, and refreshes when the user presses Enter, clicks search, or clears the input.

The component is shared because the interaction and semantics are identical across all resource lists. Existing table, edit, and delete behavior remains unchanged.

## Error Handling

- Empty or whitespace-only `q`: treated as no search.
- More than 100 characters: HTTP 422 with a clear Chinese error message.
- Database errors: continue through the existing admin error middleware.
- Search returning no matches: successful empty array.

## Testing

Add dependency-free tests using Node's `assert` module for:

- empty query behavior;
- resource-specific field allowlists;
- multi-field Hero search;
- regex metacharacter escaping;
- case-insensitive matching;
- query-length rejection;
- unknown model behavior.

Run the existing admin lint/build and server search tests without modifying dependency versions or lockfiles.

## Compatibility and Rollback

The API response remains an array and requests without `q` are unchanged. The feature is isolated to one helper, one reusable component, and list-view wiring. It can be reverted as a single commit without migrating data.
