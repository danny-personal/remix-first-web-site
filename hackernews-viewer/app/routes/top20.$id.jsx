import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getItem } from '~/utils/hackerNews.server';
import stylesUrl from '~/style/article.css';

export const links = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

// (1) routes内のコンポーネントファイルなのでloaderが持てる
export const loader = async ({ params }) => {
  // (2) paramsからURLのパラメータを取り出す
  const { id } = params;
  // (3) 記事データを取得する
  const item = await getItem(id);

  const kidsItems = await Promise.all(item.kids.map((kidsItemId) => getItem(kidsItemId)));

  // (4) useLoaderData() で取り出すためのデータを application/json としてクライアントに送る
  return json({
    item,
    kids: kidsItems,
  });
};

export default function Top20IdRoute() {
  // (5) loaderの戻り値がそのまま渡される
  const loaderData = useLoaderData();
  const item = loaderData.item;
  const kids = loaderData.kids;

  return (
    <article>
      <h1>{item.title}</h1>{/* (6) */}
      <p>by {item.by} on {new Date(item.time * 1000).toLocaleString()}</p>
      <p><a href={item.url}>{item.url}</a></p>
      <h2>Comments</h2>
      {kids.map((kidsItems) => (
        <dev key={kidsItems.id}>
            <h3>by: {kidsItems.by}</h3>
            <p>{kidsItems.text}</p>
            <p>{new Date(kidsItems.time * 1000).toLocaleString()}</p>
            <hr />
        </dev>
      ))}
    </article>
  );
}
