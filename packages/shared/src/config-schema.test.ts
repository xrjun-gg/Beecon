import { describe, expect, it } from "vitest";
import { PaperclipConfigSchema } from "./config-schema.js";

describe("Paperclip config schema", () => {
  it("defaults omitted runtime paths to legacy instance-root locations", () => {
    const parsed = PaperclipConfigSchema.parse({
      $meta: {
        version: 1,
        updatedAt: "2026-05-10T00:00:00.000Z",
        source: "configure",
      },
      database: {
        mode: "embedded-postgres",
      },
      logging: {
        mode: "file",
      },
      server: {},
    });

    expect(parsed.database.embeddedPostgresDataDir).toBe("~/.Paperclip/instances/default/db");
    expect(parsed.database.backup.dir).toBe("~/.Paperclip/instances/default/data/backups");
    expect(parsed.logging.logDir).toBe("~/.Paperclip/instances/default/logs");
    expect(parsed.storage.localDisk.baseDir).toBe("~/.Paperclip/instances/default/data/storage");
    expect(parsed.secrets.localEncrypted.keyFilePath).toBe("~/.Paperclip/instances/default/secrets/master.key");
  });
});
