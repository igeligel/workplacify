import deepmerge from "deepmerge";
import { GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const getMessages = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const userMessages = (await import(`./${context.locale}.json`)).default;
  const defaultMessages = (await import(`./en.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);
  return messages;
};
