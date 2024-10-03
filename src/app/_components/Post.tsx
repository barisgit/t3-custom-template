"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const utils = api.useUtils();

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.getLatest.invalidate();
      setName("");
      setError(null);
      router.refresh();
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Post name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-primary-default text-primary-foreground btn btn-primary"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
