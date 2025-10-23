# Test Plan – Legacy Bridge Project

## parseLine(line: string)
- **Valid**: correct line → full JSON record.
- **Invalid**: too short → skipped.
- **Invalid**: missing ISBN → skipped.
- **Edge**: max-length title/author → works.
- **Invalid**: non-numeric year → null year.

## getRecordByIsbn(isbn: string)
- Valid ISBN → returns record.
- Invalid ISBN → 404 / null.
- Not found → returns null.

## API
- GET /records
  - Valid: returns paginated list.
  - Edge: empty DB → empty list.
- GET /records/{isbn}
  - Valid: returns record.
  - Invalid: 404.
- GET /search?q=title
  - Valid: returns matches.
  - Edge: no matches → [].

## Tools
- Jest for unit tests.
- Supertest for API.
- GitHub Actions for CI.
