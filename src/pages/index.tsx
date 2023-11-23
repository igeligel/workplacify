import { Link } from "@chakra-ui/next-js";

const IndexPage = () => {
  return (
    <div className="flex flex-col bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">
        Welcome to your tRPC with Prisma starter!
      </h1>
      <p className="text-gray-400">
        If you get stuck, check{" "}
        <Link className="underline" href="https://trpc.io">
          the docs
        </Link>
        , write a message in our{" "}
        <Link className="underline" href="https://trpc.io/discord">
          Discord-channel
        </Link>
        , or write a message in{" "}
        <Link
          className="underline"
          href="https://github.com/trpc/trpc/discussions"
        >
          GitHub Discussions
        </Link>
        .
      </p>

      <div className="flex flex-col py-8 items-start gap-y-2">
        <div className="flex flex-col"></div>
        <h2 className="text-3xl font-semibold">Latest Posts</h2>
      </div>

      <hr />

      <div className="flex flex-col py-8 items-center">
        <h2 className="text-3xl font-semibold pb-2">Add a Post</h2>

        <form
          className="py-2 w-4/6"
          onSubmit={async (e) => {
            /**
             * In a real app you probably don't want to use this manually
             * Checkout React Hook Form - it works great with tRPC
             * @see https://react-hook-form.com/
             * @see https://kitchen-sink.trpc.io/react-hook-form
             */
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-y-4 font-semibold"></div>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
