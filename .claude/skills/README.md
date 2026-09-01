# Vendored skills

`client-site-build/` carries the client website build process and both tier documents. It
loads automatically for any Claude Code session opened in this repository.

**To use it on another build**, copy the folder into that repo:

```bash
cp -r .claude/skills/client-site-build /path/to/other-repo/.claude/skills/
```

**To make it available in every project on this machine**, install it for the user instead:

```bash
cp -r .claude/skills/client-site-build ~/.claude/skills/
```

The process is expected to grow. When a build produces a new correction, add it to the
matching tier document under `client-site-build/references/` rather than to a build's own
notes — the whole point is that the next build inherits it.
