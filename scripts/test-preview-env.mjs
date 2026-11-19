// Simulate preview environment
process.env.VERCEL_ENV = "preview";

async function test() {
  const robotsModule = await import("../src/app/robots.ts");
  const robotsFn = robotsModule.default;
  const robotsResult = robotsFn();
  console.log("=== PREVIEW ROBOTS.TS ===");
  console.log(JSON.stringify(robotsResult, null, 2));

  const layoutModule = await import("../src/app/layout.tsx");
  const meta = await layoutModule.generateMetadata();
  console.log("\n=== PREVIEW LAYOUT METADATA ROBOTS ===");
  console.log(JSON.stringify(meta.robots, null, 2));

  // Reset to production
  process.env.VERCEL_ENV = "production";
  const robotsProd = robotsFn();
  console.log("\n=== PRODUCTION ROBOTS.TS ===");
  console.log(JSON.stringify(robotsProd, null, 2));

  const metaProd = await layoutModule.generateMetadata();
  console.log("\n=== PRODUCTION LAYOUT METADATA ROBOTS ===");
  console.log(JSON.stringify(metaProd.robots, null, 2));
}

test().catch(console.error);
