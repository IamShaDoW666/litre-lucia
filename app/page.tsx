"use client";

import Navbar from "@/components/NavBar";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-secondary to-tertiary/10 px-4 py-12 dark:from-primary/25 dark:via-primary-foreground/10 dark:to-secondary/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mt-16 md:mt-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Faster <br /> with Next.js SaaS Starter Kit{" "}
            <span className="text-primary">Litre.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            Launch your SaaS product effortlessly with our pre-configured
            Next.js starter template. Enjoy built-in authentication, seamless
            Stripe integration, and a responsive dashboard—all designed to
            accelerate your development process.
          </p>

          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by innovative companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* Replace these with real logos in your project */}
              <span className="text-lg font-semibold">Simon</span>
              <span className="text-lg font-semibold">Order.co</span>
              <span className="text-lg font-semibold">Fama</span>
              <span className="text-lg font-semibold">Rho</span>
              <span className="text-lg font-semibold">Tiny</span>
              <span className="text-lg font-semibold">MarketMan</span>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
