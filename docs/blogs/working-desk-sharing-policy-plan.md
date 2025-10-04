Create a blog article from the markdown in `docs/blogs/working-desk-sharing-policy.md`. The article should be in: `src/pages/blog/working-desk-sharing-policy/index.tsx`.

Make sure to go paragraph by paragraph. Not the whole article in one flow. Convert the markdown into React Nodes inside the component. Do not create separate components. Use components like in similar blog articles.

Before starting anything check other blog articles under the directory `src/pages/blog/`. Use the same components as in other blog articles. Do not create new components. Read all the other files there.

Within the blog article make sure to have at least 5 external and 3 internal Links. Refer to the references in the markdown for some external links. But you might also add some other external links. On the bottom there might be external links. Put them into the blog article directly if there are any.

Inside the markdown there are some `<CustomElement>`. Create TODO comments for those in the React blog post and paste the content.

For comparisons use the `<ComparisonTile />` like in other blog post pages under the directory `src/pages/blog/`.

Add at least one `<CtaActionContainer />` in the blog post similar to other blog post pages under the directory `src/pages/blog/`.

You can find all blog posts ever under the base data structure `src/blogs/blogArticles.ts`. Add only the blog article but do not do other changes.

Work ideally section by section instead of creating one big insertion. Working in sections works perfect.

Instead of quotes and special characters use the HTML representation. E.g. instead of `'` use `&apos;`.

Convert you're to you are and so on. Try to not use apostrophes if possible.
