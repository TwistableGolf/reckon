import Page from "./page";

export default function Default({
    params,
  }: {
    params: { subReckon: string };
  }) {
    return <Page params={params}></Page>
}