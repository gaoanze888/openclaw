#!/usr/bin/env node
if (process.argv[2] === "-n") {
  process.stderr.write("sudo: a password is required\n");
} else {
  process.stderr.write("Access denied: serve config denied\nUse 'sudo tailscale serve'.\n");
}
process.exit(1);
