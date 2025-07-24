"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { useAgentPropertiesStore } from "@/lib/store/agent-properties-store";
import { useRouter } from "next/navigation";

const AgentDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAgentName = useAgentPropertiesStore((state) => state.setAgentName);
  const clearProperties = useAgentPropertiesStore(
    (state) => state.clearProperties
  );
  const router = useRouter();

  const handleLogin = () => {
    clearProperties();
    setAgentName(username);
    router.push("/agent-dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-6 py-3 rounded-lg font-semibold text-blue-600 cursor-pointer h-full text-md shadow-md">
          Agent Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Agent Login</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Please enter your name and password to login.
          </DialogDescription>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              margin: "1rem 0",
            }}>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDialog;
