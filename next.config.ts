import type { NextConfig } from "next";
import { execSync } from "child_process";

const getGitCommitHash = () => {
  try {
    return execSync("git rev-parse HEAD").toString().trim();
  } catch (e) {
    return process.env.VERCEL_GIT_COMMIT_SHA || "unknown";
  }
};

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    GIT_COMMIT_SHA: getGitCommitHash(),
  },
};

export default nextConfig;
